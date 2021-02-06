import { Injectable } from '@angular/core';
import { FormService } from '../../../../../shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { CAB, CAB_DETAIL, VENDOR, REGISTRATION_UNIQUE, CAB_BADGE_UNIQUE } from '../../../../../../constant/urls';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';

@Injectable()
export class CabAddService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService,
    private _fileUploadService: FileUploadService
  ) { }

  createCabForm() {
    return this._formBuilder.group(
      {
        "cabModel": this._formService.getControl('name'),
        "seatingCapacity": this._formService.getControl('seatingCapacity'),
        "registrationNo": this._formService.getControl('alphaNumeric'),
        "type": this._formService.getControl('name'),
        "statePermitNumber": this._formService.getControl('dropdown',false),
        "countryPermitNumber": this._formService.getControl('dropdown',false),
        "vendorId": this._formService.getControl('dropdown'),
        "color": this._formService.getControl('alphabetic'),
        "fuelType": this._formService.getControl('dropdown'),
        "transmissionType": this._formService.getControl('dropdown'),
        "routeNo": this._formService.getControl('alphaNumeric'),
        "driverOwner": [],
        "driverOnly": this._formService.getControl('dropdown'),
        "ac": this._formService.getControl('dropdown'),
        "panicButton": this._formService.getControl('dropdown'),
        "toolKit": this._formService.getControl('dropdown'),
        "spareWheel": this._formService.getControl('dropdown'),
        "firstAidKit": this._formService.getControl('dropdown'),
        "torchAmbrella": this._formService.getControl('dropdown'),
        "fireExtingusher": this._formService.getControl('dropdown'),
        "interiorExterior": this._formService.getControl('dropdown'),
        // making fields optional -- satyam
        "aggrementCopy": this._formService.getControl('dropdown',false),
        "companyIssuance": this._formService.getControl('dropdown',false),
        "rgsCertificate": this._formService.getControl('dropdown',false),
        "fitnessCertificate": this._formService.getControl('dropdown',false),
        "roadTax": this._formService.getControl('dropdown',false),
        "insurance": this._formService.getControl('dropdown',false),
        "statePermitForm": this._formService.getControl('dropdown',false),
        "allIndiaPermitForm": this._formService.getControl('dropdown',false),
        "cabImage": this._formService.getControl('dropdown',false)
      }
    )
  }

  addCab(data) {
    let apiType = data.cabId ? 'put' : 'post';
    return this._http[apiType](CAB, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.cabId ? 'UPDATED' : 'ADDED']('Cab'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  getCabDetail(cabId) {
    return this._http.get<Cab.Detail>(CAB_DETAIL, { cabId });
  }

  // searchVendor(searchKey) {
  //   return this._http.get<Vendor.Detail[]>(VENDOR, { searchKey }, false);
  // }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }

  showAlert(message) {
    this._uitilityService.showAlert(message);
  }

  uploadFiles(files) {
    return this._fileUploadService.uploadFiles(files);
  }

  checkRegistrationUnique(data: object) {
    return this._http.get<any>(REGISTRATION_UNIQUE, data, false);
  }

  checkBadgeUnique(data: object) {
    return this._http.get<any>(CAB_BADGE_UNIQUE, data, false);
  }

}
