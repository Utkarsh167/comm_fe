import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { GET_ALL_GROUPS, GET_FILTERED_CAB, ROSTER, GET_UPDATED_REQUEST, UPDATE_REQUEST, GET_CAB_FOR_ROSTER, GET_ALL_GROUP_FOR_ASSIGN_CAB, COMPANY_SHIFT, DELETE_CAB_MAPPING, CHECK_EXISTING_ROASTERS } from '../../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { VENDOR } from 'src/app/constant/routes';

@Injectable({
  providedIn: 'root'
})
export class RosterListServiceService {

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
        toDate: form.controls.toDate
      },

    }
  }

  getGroups(data) {
    return this._http.get<any>(GET_ALL_GROUPS, data);
  }

  getGroupsForAssignCab(data) {
    return this._http.get<any>(GET_ALL_GROUP_FOR_ASSIGN_CAB, data);
  }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }

  getCabs(data) {
    return this._http.get<any>(GET_FILTERED_CAB, data);
  }


  getCabsForRoster(data) {
    return this._http.get<any>(GET_CAB_FOR_ROSTER, data);
  }

  getUpdatedRequest(data) {
    return this._http.get<any>(GET_UPDATED_REQUEST, data);
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

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Request')
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = this._http.put(UPDATE_REQUEST, body.obj).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Request'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }


  createCabForm() {
    return this._formBuilder.group(
      {
        "validFrom": this._formService.getControl('dropdown'),
        "validTill": this._formService.getControl('dropdown'),
      }
    )
  }
  // deleteCabMapping -- satyam
  deleteCabMapping (data) {
    let apiType = 'post';
    return this._http[apiType](DELETE_CAB_MAPPING,data).pipe( map(
      response => {
        this._utilityService.showAlert(COMMON_MESSAGES['DELETE']('Cab Mapping'));
        return response;
      }
    ),
    catchError(
      error => throwError(error)
    )
    )
  }
  // check existing rosters -- satyam
  checkExistingRoasters (data) {
    let apiType = 'post';
    return this._http[apiType](CHECK_EXISTING_ROASTERS,data).pipe( map(
      response => {
        // this._utilityService.showAlert(COMMON_MESSAGES['DELETE']('Cab Mapping'));
        return response;
      }
    ),
    catchError(
      error => throwError(error)
    )
    )
  }


}
