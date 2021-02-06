import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_LIST, GET_ALL_GROUPS, CAB_LIST, GET_FILTERED_CAB, ROSTER, GET_ALL_ROSTER, GET_CAB_FOR_ROSTER, CONTINUE_ROSTER, COMPANY_SHIFT, ROSTER_MERGE, GET_CAB_ROSTER, ADD_MERGED_ROSTER } from '../../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { VENDOR } from 'src/app/constant/routes';

@Injectable({
  providedIn: 'root'
})
export class RouteRosterListService {

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

  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }

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

  getAllRoster(data) {
    return this._http.get<any>(GET_ALL_ROSTER, data);
  }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }
  // new roster flow -- satyam
  // getCabs(data) {
  //   return this._http.get<any>(GET_CAB_FOR_ROSTER, data);
  // }

  getCabs(data) {
    let apiType = 'post';
    return this._http[apiType](GET_CAB_ROSTER, data);
  }

  addRoster(data) {
    let apiType = 'post';
    return this._http[apiType](ROSTER, data).pipe(
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


  contiuneRoster(data) {
    let apiType = 'post';
    return this._http[apiType](CONTINUE_ROSTER, data).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPDATED']('Roster'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  editRoster(data) {
    let apiType = 'put';
    return this._http[apiType](ROSTER, data).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPDATED']('Roster'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }


  createRosterForm() {
    return this._formBuilder.group(
      {
        "validFrom": this._formService.getControl('dropdown'),
        "validTill": this._formService.getControl('dropdown'),
      }
    )
  }
  getMergedRosters(data) {
    let apiType = 'put';
    return this._http[apiType](ROSTER_MERGE, data);
  }
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
