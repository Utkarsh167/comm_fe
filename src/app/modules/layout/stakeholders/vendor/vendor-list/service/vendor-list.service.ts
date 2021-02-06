import { Injectable } from '@angular/core';
import { FormService } from '../../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../../shared/services/http.service';
import { UtilityService } from '../../../../../shared/services/utility.service';
import { VENDOR_LIST, BLOCK_VENDOR, VENDOR, VENDOR_BULKUPLOAD } from '../../../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class VendorListService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'status']))
  }

  getVendors(data) {
    return this._http.get<Vendor.List>(VENDOR_LIST, data);
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      status: {
        label: 'Status',
        list: [
          { viewValue: 'Active', value: 'unblocked' },
          { viewValue: 'Blocked', value: 'blocked' }
        ],
        control: form.controls.status
      }
    }
  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Vendor'),
        // reasonForArchive
        showTextBox: status === 'DELETED' ? true : false,
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          // reasonForArchive
          // this._http.delete(VENDOR + "/" + body.userId).toPromise() :
          this._http.post(VENDOR + "/" + body.userId, { comment: success.note}).subscribe(response=>{
            this._utilityService.showAlert(response.message)

          }) :
          this._http.post(BLOCK_VENDOR + body.userId, { status: body.status }).subscribe(response=>{
            this._utilityService.showAlert(response.message)

          },error=>{
            this._utilityService.showAlert(error.message)

          });
        await response;
       // this._utilityService.showAlert(COMMON_MESSAGES[status].success('Vendor'))
        return Promise.resolve(response);
      } else {
        
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  uploadFile(data) {
    var formData = new FormData();
    formData.append('file', data);
    let apiType = 'post';
    return this._http[apiType](VENDOR_BULKUPLOAD, formData).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPLOADED']('File'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

}
