import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { GET_ALL_CAB_LIST,COMPANY_SHIFT } from '../../../../../../constant/urls';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private _http: HttpService,
    private _formService: FormService,
    private _formBuilder: FormBuilder,
  ) { }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['tripStatus']))
  }

  // filter-by-shift - satyam
  getShiftsFilterForm() {
    return this._formBuilder.group(
      {
        "shiftName": "",

      }
    )
  }

  createFilterObject(form: FormGroup) {
    return {
      status: {
        label: 'Status',
        list: [
          { value: '', viewValue: 'All' },
          { value: 1, viewValue: 'Completed' },
          { value: 2, viewValue: 'Ongoing' },
          { value: 3, viewValue: 'Scheduled' },
          // Added Missed -  Shivakumar A
          { value: 4, viewValue: 'Missed' },


        ],
        control: form.controls.tripStatus
      },
    }
  }

  getAllCabs(data) {
    return this._http.get<any>(GET_ALL_CAB_LIST, data);
  }

  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }

}
