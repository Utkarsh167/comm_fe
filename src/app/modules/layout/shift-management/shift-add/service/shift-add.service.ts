import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { USER_DETAIL, COMPANY_SHIFT, SHIFT_UPDATE } from '../../../../../constant/urls';

@Injectable({
  providedIn: 'root'
})
export class ShiftAddService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService
  ) { }

  getAllCompanyShifts() {
    return this._http.get<any>(COMPANY_SHIFT);
  }

  getEmployeeDetail(userId) {
    return this._http.get<Employee.Detail>(USER_DETAIL, { userId });
  }

  createEmployeeForm() {
    return this._formBuilder.group(
      {
        "name": this._formService.getControl('name'),
        "email": this._formService.getControl('email'),
        "employeeId": this._formService.getControl('dropdown'),
        "shiftName": this._formService.getControl('dropdown'),
        "validFrom": this._formService.getControl('dropdown'),
        "validTill": this._formService.getControl('dropdown'),
      }
    )
  }

  addShift(data) {
    let apiType = 'post';
    return this._http[apiType](SHIFT_UPDATE, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES['UPDATED']('Employee shift'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }



}
