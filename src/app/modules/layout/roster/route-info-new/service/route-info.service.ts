import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { ROSTER_DETAILS,GROUP_DETAIL, ROSTER_UPDATE, SEARCH_EMPLOYEE_BY_ID, EMP_FOR_GROUP, GET_NEW_ROSTER, VENDOR, GET_CAB_ROSTER, ADD_MERGED_ROSTER } from '../../../../../constant/urls';
import { map, catchError } from 'rxjs/operators';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { COMMON_MESSAGES } from 'src/app/constant/messages';
import { throwError } from 'rxjs';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getRosterDetail(data) {
    return this._http.get<any>(ROSTER_DETAILS, data);
  }
  getEmployeesForGroup(data){
    return this._http.get<Employee.List>(EMP_FOR_GROUP, data);
  }
  addEmployee(data) {
    let apiType = 'put';
    return this._http[apiType](ROSTER_UPDATE, data).pipe(
      map(
        response => {
          this._utilityService.showAlert("Roster Update successfully");
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }
  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'shiftName']))
  }

  // getCompanyShift() {
  //   return this._http.get<any>(COMPANY_SHIFT);
  // }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.fromDate
      },

    }
  }

  createEditRosterForm() {
    return this._formBuilder.group(
      {
        "vendor": this._formService.getControl('dropdown'),
        "cab": this._formService.getControl('dropdown'),
      }
    )
  }
  // new roster -- satyam
  getNewRoster(data) {
    let apiType = 'post';
    return this._http[apiType](GET_NEW_ROSTER, data);
  }

  // getAllRoster(data) {
  //   return this._http.get<any>(GET_ALL_ROSTER, data);
  // }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }

  getCabs(data) {
    let apiType = 'post';
    return this._http[apiType](GET_CAB_ROSTER, data);
  }

  // addRoster(data) {
  //   let apiType = 'post';
  //   return this._http[apiType](ROSTER, data).pipe(
  //     map(
  //       response => {
  //         this._utilityService.showAlert(COMMON_MESSAGES['ADDED']('Roster'));
  //         return response;
  //       }
  //     ),
  //     catchError(
  //       error => throwError(error)
  //     )
  //   )
  // }


  // contiuneRoster(data) {
  //   let apiType = 'post';
  //   return this._http[apiType](CONTINUE_ROSTER, data).pipe(
  //     map(
  //       response => {
  //         this._utilityService.showAlert(COMMON_MESSAGES['UPDATED']('Roster'));
  //         return response;
  //       }
  //     ),
  //     catchError(
  //       error => throwError(error)
  //     )
  //   )
  // }

  // editRoster(data) {
  //   let apiType = 'put';
  //   return this._http[apiType](ROSTER, data).pipe(
  //     map(
  //       response => {
  //         this._utilityService.showAlert(COMMON_MESSAGES['UPDATED']('Roster'));
  //         return response;
  //       }
  //     ),
  //     catchError(
  //       error => throwError(error)
  //     )
  //   )
  // }


  // createRosterForm() {
  //   return this._formBuilder.group(
  //     {
  //       "validFrom": this._formService.getControl('dropdown'),
  //       "validTill": this._formService.getControl('dropdown'),
  //     }
  //   )
  // }
  // getMergedRosters(data) {
  //   let apiType = 'put';
  //   return this._http[apiType](ROSTER_MERGE, data);
  // }
  addMergedRosters(data) {
    let apiType = 'post';
    return this._http[apiType](ADD_MERGED_ROSTER, data).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['ADDED']('Roster'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }
}
