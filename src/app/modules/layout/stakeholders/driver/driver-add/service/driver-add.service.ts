import { Injectable } from '@angular/core';
import { FormService } from '../../../../../shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { ADD_DRIVER, USER_DETAIL, CHECK_DRIVER_NUMBER_UNIQUE } from '../../../../../../constant/urls';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';

@Injectable()
export class DriverAddService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService,
    private _fileUploadService:FileUploadService
  ) { }

  createDriverForm() {
    return this._formBuilder.group(
      {
        "name": this._formService.getControl('name'),
        "email": this._formService.getControl('email'),
        "mobileNo": this._formService.getControl('phone'),
        "addressProof":this._formService.getControl('dropdown',false),
        "dl":this._formService.getControl('dropdown',false),
        "rightPalm":this._formService.getControl('dropdown',false),
        "leftPalm":this._formService.getControl('dropdown',false),
        "profilePicture": this._formService.getControl('dropdown',false),
        "emergencyNo": this._formService.getControl('phone'),
        "drunker": this._formService.getControl('dropdown'),
        "alcoholic": this._formService.getControl('dropdown'),
        "tobacco": this._formService.getControl('dropdown'),
        "backgroundVarified": this._formService.getControl('dropdown'),
        "dlRenewalDate": this._formService.getControl('dropdown',false),
        "DlBadgeNO": this._formService.getControl('alphaNumeric',false),
      }
    )
  }

  addDriver(data) {
    let apiType = data.userId?'put':'post';
    return this._http[apiType](ADD_DRIVER, data).pipe(
      map( 
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.userId?'UPDATED':'ADDED']('Driver'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  checkDriverNoUnique(data: object) {
    return this._http.get<any>(CHECK_DRIVER_NUMBER_UNIQUE, data, false);
  }

  showAlert(message) {
    this._uitilityService.showAlert(message);
  }

  uploadFiles(files) {
    return this._fileUploadService.uploadFiles(files);
  }

  getDriverDetail(userId) {
    return this._http.get<Driver.Detail>(USER_DETAIL, { userId });
  }
}
