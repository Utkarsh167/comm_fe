import { Component, OnInit } from '@angular/core';
import { VendorAddService } from '../service/vendor-add.service';
import { FormGroup } from '@angular/forms';
import { GENDERS } from '../../../../../../constant/app-constant';
import { Router, ActivatedRoute } from '@angular/router';
import { VENDOR } from '../../../../../../constant/absolute-routes';
import { onSelectFile } from '../../../../../../constant/file-input';
import { invalidFileError, invalidFileSize, ADD_VENDOR_MESSAGES as messages } from '../../../../../../constant/messages';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {

  vendorForm: FormGroup;
  genders = GENDERS;
  vendorId: string;
  vendorDetail:Vendor.Detail;
  vendorImage: string;
  vendorImageFile: any;

  constructor(
    private _vendorAddService: VendorAddService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.vendorId = this._route.snapshot.params.vendorId;
    if (this.vendorId) {
      this.getVendorDetail();
    }
  }

  createForm() {
    this.vendorForm = this._vendorAddService.createVendorForm();
  }

  getVendorDetail() {
    this._vendorAddService.getVendorDetail(this.vendorId).subscribe(
      response => {
        this.vendorDetail = response.data;
        this.patchValue(response.data);
      }, err => {
        this._router.navigate([VENDOR]);
      }
    )
  }

  patchValue(data) {

    let formValue = {
      "name": data.name,
      "email": data.email,
      "mobileNo": data.mobileNo
    };
    this.vendorForm.patchValue(formValue);
    this.vendorImage = data.profilePicture;
  }

  getControl(control) {
    return this.vendorForm.controls[control];
  }

  async uploadImage() {
    try {
      return await this._vendorAddService.uploadImage(this.vendorImageFile);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async submitForm() {
    if (this.vendorForm.invalid || this.vendorForm.disabled) {
      return;
    }
    if (!this.vendorImageFile && !this.vendorImage) {
      this._vendorAddService.showAlert(messages.vendorImage);
      return;
    }
    const data = { ...this.vendorForm.value };
    this.vendorForm.disable();

    if(this.vendorId) {
      data['userId'] = this.vendorId;
    }
    const files = await this.uploadImage();
    data['profilePicture'] = files[0] ? files[0].Location : this.vendorImage;
    this.addVendor(data);
  }

  addVendor(data) {
    this._vendorAddService.addVendor(data).subscribe(
      response => {
        this._router.navigate([VENDOR])
      },
      err => {
        this.vendorForm.enable();
      }
    )
  }

  /**
   * @description This function is called when user change profile pic. Save that file
   * @param event 
   */
  async onSelectFile(event) {
    try {
      let result = await onSelectFile(event);
      this.vendorImage = result.url;
      this.vendorImageFile = result.file;
    } catch (err) {
      if (err.type) {
        this._vendorAddService.showAlert(invalidFileError());
      } else if (err.size) {
        this._vendorAddService.showAlert(invalidFileSize())
      }
    }
  }


}
