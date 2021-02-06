import { Injectable } from '@angular/core';
import { FormService } from '../../../../../shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { VENDOR,VENDOR_DETAIL } from '../../../../../../constant/urls';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';

@Injectable()
export class VendorAddService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService,
    private _fileUploadService:FileUploadService
  ) { }

  createVendorForm() {
    return this._formBuilder.group(
      {
        "name": this._formService.getControl('name'),
        "email": this._formService.getControl('email'),
        // "countryCode": this._formService.getControl('name'),
        "mobileNo": this._formService.getControl('phone'),
      }
    )
  }

  addVendor(data) {
    let apiType = data.userId?'put':'post';
    return this._http[apiType](VENDOR, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.userId?'UPDATED':'ADDED']('Vendor'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  getVendorDetail(userId) {
    return this._http.get<Vendor.Detail>(VENDOR_DETAIL, { userId });
  }

  showAlert(message) {
    this._uitilityService.showAlert(message);
  }

  uploadImage(image) {
    return this._fileUploadService.uploadFiles([image]);
  }
}
