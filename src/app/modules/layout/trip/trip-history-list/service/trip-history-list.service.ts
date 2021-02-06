import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { GET_ALL_ROSTER, COMPANY_SHIFT } from '../../../../../constant/urls';
import { UtilityService } from '../../../../shared/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class TripHistoryListService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'shiftName']))
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Trip Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },

    }
  }

  getAllRoster(data) {
    return this._http.get<any>(GET_ALL_ROSTER, data);
  }

  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }
}
