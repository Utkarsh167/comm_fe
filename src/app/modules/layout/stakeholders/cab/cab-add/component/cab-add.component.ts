import { Component, OnInit } from '@angular/core';
import { CabAddService } from '../service/cab-add.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CAB } from '../../../../../../constant/absolute-routes';
import { distinctUntilChanged, debounceTime, } from 'rxjs/operators';
import { invalidFileError, invalidFileSize } from '../../../../../../constant/messages';
import { FUEL_TYPE, TRANSMISSION_TYPE, CAR_TYPE, RADIO_OPTION, getFileName } from '../../../../../../constant/app-constant';
import { onSelectFile } from '../../../../../../constant/file-input';

@Component({
  selector: 'app-cab-add',
  templateUrl: './cab-add.component.html',
  styleUrls: ['./cab-add.component.scss']
})
export class CabAddComponent implements OnInit {

  cabForm: FormGroup;
  cabId: string;
  cabDetail: Cab.Detail;
  vendors: Vendor.Detail[] = [];
  selectedVendorId: string;
  fuelType = FUEL_TYPE;
  transmissionType = TRANSMISSION_TYPE;
  carType = CAR_TYPE;
  radioOption = RADIO_OPTION;
  vendorSearchConfig: any;
  isSubUniqueMsg: string;
  isBadgeUniqueMsg: string;
  docs = {
    "aggrementCopy": '',
    "companyIssuance": '',
    "rgsCertificate": '',
    "fitnessCertificate": '',
    "roadTax": '',
    "insurance": '',
    "statePermitForm": '',
    "allIndiaPermitForm": '',
    "cabImage": ''
  };
  docFiles = {
    "aggrementCopy": null,
    "companyIssuance": null,
    "rgsCertificate": null,
    "fitnessCertificate": null,
    "roadTax": null,
    "insurance": null,
    "statePermitForm": null,
    "allIndiaPermitForm": null,
    "cabImage": null
  };
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  selected = '';


  constructor(
    private _cabAddService: CabAddService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.createForm();
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  // Added assignMedicalCabSymbol - Shivakumar A
  assignMedicalCabSymbol(data) {
    if (data === this.medicalCabValue) {
      this.selected = 'medical_cab_symbol';
    } else {
      this.selected = '';
    }
  }
  
  ngOnInit() {
    this.cabId = this._route.snapshot.params.cabId;
    if (this.cabId) {
      this.getCabDetail();
    }
    else {
      this.validateRegNo();
      this.validateBadgeNo();
    }
    this.searchVendor();

  }

  
  /********  Validate registration number is unique or not ********/
  validateRegNo() {
    this.cabForm.controls.registrationNo.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(res => {
      if (res && res.length >= 3) {
        this.checkRegistrationUnique(res);
      }
    });
  }
  /***********  END   ************/

  /***********  For checking registration number is unique or not  ************/
  checkRegistrationUnique(data: string) {
    let value = data.trim();
    this._cabAddService.checkRegistrationUnique({ registrationNo: value }).subscribe(resp => {
      if (resp && resp.statusCode == 200) {
        this.isSubUniqueMsg = null;
      }
      else if (resp && resp.statusCode == 400) {
        this.cabForm.controls['registrationNo'].setErrors({ 'incorrect': true });
        this.isSubUniqueMsg = "Registration number must be unique";
      }
    })
  }
  /***********  END   ************/


  /********  Validate badge number is unique or not ********/
  validateBadgeNo() {
    this.cabForm.controls.routeNo.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(res => {
      if (res && res.length >= 3) {
        this.checkBadgeUnique(res);
      }
    });
  }
  /***********  END   ************/

  /***********  For checking badge number is unique or not  ************/
  checkBadgeUnique(data: string) {
    let value = data.trim();
    this._cabAddService.checkBadgeUnique({ routeNo: value }).subscribe(resp => {
      if (resp && resp.statusCode == 200) {
        this.isBadgeUniqueMsg = null;
      }
      else if (resp && resp.statusCode == 400) {
        this.cabForm.controls['routeNo'].setErrors({ 'incorrect': true });
        this.isBadgeUniqueMsg = "Badge number must be unique";
      }
    })
  }
  /***********  END   ************/

  createForm() {
    this.cabForm = this._cabAddService.createCabForm();
  }
  trimColor() {
    this.getControl('color').setValue(this.getControl('color').value.trim());
  }
  async uploadFiles() {
    try {
      let files = [];
      for (let item in this.docFiles) {
        files.push(this.docFiles[item]);
      }
      return await this._cabAddService.
        uploadFiles(files);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // searchVendor() {
  //   this.cabForm.controls.vendorId.valueChanges.pipe(
  //     distinctUntilChanged(),
  //     debounceTime(500),
  //     tap(x => {
  //       if (typeof x === 'string') {
  //         if (!x.trim()) {
  //           this.vendors = [];
  //         } else if (x.trim().length < 3) {
  //           this.vendors = this.vendors.filter(item => item.name.indexOf(x.trim()) >= 0)
  //         }
  //       }
  //     }),
  //     filter(x => (x && typeof x === 'string' && x.trim() && x.trim().length >= 3)),
  //     switchMap(data => this._cabAddService.searchVendor(data))
  //   ).subscribe(
  //     response => {
  //       this.vendors = response.data;
  //     }
  //   )
  // }

  searchVendor() {
    this._cabAddService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    })
  }


  selectVendor(event) {
    this.selectedVendorId = event.option.value._id;
    // this.getControl('vendorId').setValue(event.option.value.name)
  }

  getCabDetail() {
    this._cabAddService.getCabDetail(this.cabId).subscribe(
      response => {
        this.cabDetail = response.data;
        this.patchValue(response.data);
      }, err => {
        this._router.navigate([CAB]);
      }
    )
  }

  patchValue(data) 
  {
    //console.log(data);
    let formValue = {
      "cabModel": data.cabModel,
      "seatingCapacity": data.seatingCapacity,
      "registrationNo": data.registrationNo,
      "type": data.type,
      "statePermitNumber": data.statePermitNumber,
      "countryPermitNumber": data.countryPermitNumber,
      "vendorId": data.vendor._id,
      "color": data.color,
      "fuelType": data.fuelType,
      "transmissionType": data.transmissionType,
      "routeNo": data.routeNo,
      "driverOwner": data.driverOwner,
      "driverOnly": data.driverOnly,
      "ac": data.ac,
      "panicButton": data.panicButton,
      "toolKit": data.toolKit,
      "spareWheel": data.spareWheel,
      "firstAidKit": data.firstAidKit,
      "torchAmbrella": data.torchAmbrella,
      "fireExtingusher": data.fireExtingusher,
      "interiorExterior": data.interiorExterior,
    };
    let docs = {
      "aggrementCopy": data.aggrementCopy?this.getFileName(data.aggrementCopy):'',
      "companyIssuance": data.companyIssuance?this.getFileName(data.companyIssuance):'',
      "rgsCertificate": data.rgsCertificate?this.getFileName(data.rgsCertificate):'',
      "fitnessCertificate": data.fitnessCertificate?this.getFileName(data.fitnessCertificate):'',
      "roadTax": data.roadTax?this.getFileName(data.roadTax):'',
      "insurance": data.insurance?this.getFileName(data.insurance):'',
      "statePermitForm": data.statePermitForm?this.getFileName(data.statePermitForm):'',
      "allIndiaPermitForm": data.allIndiaPermitForm?this.getFileName(data.allIndiaPermitForm):'',
      "cabImage": data.cabImage?this.getFileName(data.cabImage):''
    };

    for (let item in docs) {
      this.docs[item] = data[item];
    }
    this.selectedVendorId = data.vendorId;
    this.cabForm.patchValue({ ...formValue, ...docs });
  }

  getControl(control) {
    return this.cabForm.controls[control];
  }

  getFileName(file) {
    return getFileName(file)
  }

  async addCab() {
    let data = { ...this.cabForm.value };
    if (this.cabForm.invalid || this.cabForm.disabled) {
      return;
    }
    // if (!this.selectedVendorId) {
    //   this._cabAddService.showAlert(ADD_CAB_MESSAGES.selectVendor);
    //   return;
    // }

    if ( data.driverOwner ){

    }else{
      data.driverOwner=false;
    }

    let files = await this.uploadFiles();
    Object.keys(this.docFiles).forEach(
      (item, index) => {
        if (files[index]) {
          data[item] = files[index].Location;
        } else {
          data[item] = this.docs[item];
        }
      }
    )
    this.cabForm.disable();
    if (this.cabId) {
      data['cabId'] = this.cabId;
    }
    this._cabAddService.addCab(data).subscribe(
      response => {
        this._router.navigate([CAB]);
      }, err => {
        this.cabForm.enable();
      }
    )
  }

  /**
 * @description This function is called when user upload any file
 * @param event 
 */
  async onSelectFile(event, type, format = 'image/jpeg,image/png,application/pdf') {
    try {
      let result = await onSelectFile(event, format);
      this.handleFileSuccess(result, type);
    } catch (err) {
      if (err.type) {

        if (format === 'image/jpeg,image/png,application/pdf') {
          this._cabAddService.showAlert(invalidFileError('image/jpeg,image/png images and pdf'));
        } else {
          this._cabAddService.showAlert(invalidFileError());
        }

      } else if (err.size) {
        this._cabAddService.showAlert(invalidFileSize())
      }
    }
  }

  handleFileSuccess(result, type) {
    this.docFiles[type] = result.file;
    this.docs[type] = result.url;
    this.cabForm.controls[type].setValue(result.name);
  }

}
