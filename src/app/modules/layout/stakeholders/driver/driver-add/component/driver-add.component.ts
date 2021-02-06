import { Component, OnInit } from "@angular/core";
import { DriverAddService } from "../service/driver-add.service";
import { FormGroup } from "@angular/forms";
import {
  DOCUMENT_TYPES,
  RADIO_OPTION,
  DRINK_STATUS,
  getFileName
} from "../../../../../../constant/app-constant";
import { Router, ActivatedRoute } from "@angular/router";
import { DRIVER } from "../../../../../../constant/absolute-routes";
import { onSelectFile } from "../../../../../../constant/file-input";
import {
  invalidFileError,
  invalidFileSize,
  ADD_DRIVER_MESSAGES as messages
} from "../../../../../../constant/messages";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-driver-add",
  templateUrl: "./driver-add.component.html",
  styleUrls: ["./driver-add.component.scss"]
})
export class DriverAddComponent implements OnInit {
  driverForm: FormGroup;
  radioOptions = RADIO_OPTION;
  driverId: string;
  driverDetail: Driver.Detail;
  minDate: Date;
  isUniqueMsg: string;

  driverImage: string;
  leftPalmUrl: string;
  rightPalmUrl: string;
  addressProof: string;
  dlUrl: string;

  driverImageFile: any;
  leftPalmFile: any;
  rightPalmFile: any;
  addressProofFile: any;
  dlFile;

  documentTypes = DOCUMENT_TYPES;
  drinkingStatus = DRINK_STATUS;

  constructor(
    private _driverAddService: DriverAddService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.driverId = this._route.snapshot.params.driverId;
    this.minDate = new Date();
    if (this.driverId) {
      this.getDriverDetail();
    } else {
      this.validateMobileNo();
    }
  }

  /********  Validate emp no is unique or not ********/
  validateMobileNo() {
    this.driverForm.controls.mobileNo.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (res && res.length >= 3) {
          this.checkDriverNoUnique(res);
        }
      });
  }
  /***********  END   ************/

  /***********  For checking emp no is unique or not  ************/
  checkDriverNoUnique(data: string) {
    this._driverAddService
      .checkDriverNoUnique({ mobileNo: data })
      .subscribe(resp => {
        if (resp && resp.statusCode == 200) {
          this.isUniqueMsg = null;
        } else if (resp && resp.statusCode == 400) {
          this.driverForm.controls["mobileNo"].setErrors({
            incorrect: true
          });
          this.isUniqueMsg = "Mobile Number must be unique";
        }
      });
  }
  /***********  END   ************/

  createForm() {
    this.driverForm = this._driverAddService.createDriverForm();
  }

  getDriverDetail() {
    this._driverAddService.getDriverDetail(this.driverId).subscribe(
      response => {
        this.driverDetail = response.data;
        this.patchValue(response.data);
      },
      err => {
        this._router.navigate([DRIVER]);
      }
    );
  }

  patchValue(data) {
    let addressProof = data.documents.filter(
      x => x.type === this.documentTypes.addressProof
    )[0];
    let dl = data.documents.filter(
      x => x.type === this.documentTypes.fullDl
    )[0];
    let leftPalm = data.documents.filter(
      x => x.type === this.documentTypes.leftPalm
    )[0];
    let rightPalm = data.documents.filter(
      x => x.type === this.documentTypes.rightPalm
    )[0];

    let formValue = {
      name: data.name,
      email: data.email,
      mobileNo: data.mobileNo,
      addressProof: addressProof?this.getFileName(addressProof.frontImageUrl):'',
      dl: dl?this.getFileName(dl.frontImageUrl):'',
      rightPalm: rightPalm?this.getFileName(rightPalm.frontImageUrl):'',
      leftPalm: leftPalm?this.getFileName(leftPalm.frontImageUrl):'',
      profilePicture: data?this.getFileName(data.profilePicture):'',
      emergencyNo: data.emergencyNo,
      drunker: data.drunker,
      alcoholic: data.alcoholic,
      tobacco: data.tobacco,
      backgroundVarified: data.backgroundVarified,
      dlRenewalDate: new Date(data.dlRenewalDate),
      DlBadgeNO: data.DlBadgeNO
    };
    this.driverForm.patchValue(formValue);
    this.driverImage = data?data.profilePicture:'';
    this.addressProof = addressProof?addressProof.frontImageUrl:'';
    this.leftPalmUrl = leftPalm?leftPalm.frontImageUrl:'';
    this.rightPalmUrl = rightPalm?rightPalm.frontImageUrl:'';
    this.dlUrl = dl?dl.frontImageUrl:'';
    this.minDate = new Date(
      Math.min(new Date(data.dlRenewalDate).getTime(), new Date().getTime())
    );
  }

  getControl(control) {
    return this.driverForm.controls[control];
  }

  async uploadFiles() {
    try {
      return await this._driverAddService.uploadFiles([
        this.driverImageFile,
        this.dlFile,
        this.leftPalmFile,
        this.rightPalmFile,
        this.addressProofFile
      ]);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getFileName(file) {
    return getFileName(file);
  }

  async submitForm() {
    if (this.driverForm.invalid || this.driverForm.disabled) {
      return;
    }
    const data = { ...this.driverForm.value };
    this.driverForm.disable();
    delete data["addressProof"];
    delete data["dl"];
    delete data["rightPalm"];
    delete data["leftPalm"];
    delete data["profilePicture"];
    const files = await this.uploadFiles();
    data["profilePicture"] = files[0] ? files[0].Location : this.driverImage;
    const documents = [];
    documents.push({
      type: this.documentTypes.fullDl,
      frontImageUrl: files[1] ? files[1].Location : this.dlUrl
    });
    documents.push({
      type: this.documentTypes.leftPalm,
      frontImageUrl: files[2] ? files[2].Location : this.leftPalmUrl
    });
    documents.push({
      type: this.documentTypes.rightPalm,
      frontImageUrl: files[3] ? files[3].Location : this.rightPalmUrl
    });
    documents.push({
      type: this.documentTypes.addressProof,
      frontImageUrl: files[4] ? files[4].Location : this.addressProof
    });
    data["documents"] = documents;
    data.dlRenewalDate = new Date(data.dlRenewalDate).getTime();
    this.addDriver(data);
  }

  addDriver(data) {
    if (this.driverId) {
      data["userId"] = this.driverId;
    }
    this._driverAddService.addDriver(data).subscribe(
      response => {
        this._router.navigate([DRIVER]);
      },
      err => {
        this.driverForm.enable();
      }
    );
  }
  /**
   * @description This function is called when user upload any file
   * @param event
   */
  async onSelectFile(
    event,
    type,
    format = "image/jpeg,image/png,application/pdf"
  ) {
    try {
      let result = await onSelectFile(event, format);
      this.handleFileSuccess(result, type);
    } catch (err) {
      if (err.type) {
        if (format === "image/jpeg,image/png,application/pdf") {
          this._driverAddService.showAlert(
            invalidFileError("image/jpeg,image/png images and pdf")
          );
        } else {
          this._driverAddService.showAlert(invalidFileError());
        }
      } else if (err.size) {
        this._driverAddService.showAlert(invalidFileSize());
      }
    }
  }

  handleFileSuccess(result, type) {
    switch (type) {
      case this.documentTypes.driverImage: {
        this.driverImage = result.url;
        this.driverImageFile = result.file;
        this.driverForm.controls.profilePicture.setValue(result.name);
        break;
      }
      case this.documentTypes.fullDl: {
        this.dlUrl = result.url;
        this.dlFile = result.file;
        this.driverForm.controls.dl.setValue(result.name);
        break;
      }
      case this.documentTypes.leftPalm: {
        this.leftPalmUrl = result.url;
        this.leftPalmFile = result.file;
        this.driverForm.controls.leftPalm.setValue(result.name);
        break;
      }
      case this.documentTypes.rightPalm: {
        this.rightPalmUrl = result.url;
        this.rightPalmFile = result.file;
        this.driverForm.controls.rightPalm.setValue(result.name);
        break;
      }
      case this.documentTypes.addressProof: {
        // test comment
        this.addressProof = result.url;
        this.addressProofFile = result.file;
        this.driverForm.controls.addressProof.setValue(result.name);
        break;
      }
      default: {
        alert("Wrong Type");
        break;
      }
    }
  }
}
