import { Injectable } from '@angular/core';
import { FormService } from '../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { BILLING } from '../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../constant/messages';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../shared/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate']))
  }

  getBillingData(data) {
    return this._http.get<any>(BILLING, data);
  }


  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
    }
  }

}
