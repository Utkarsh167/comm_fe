import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
// ADD_REMOVE_EMP route imported - Shivakumar A
import { CREATE_GROUP, GET_ALL_GROUPS, APPROVE_GROUP, MERGE_GROUP, DISSOLVE_GROUP, REGENRATE_GROUP, NEW_CREATE_GROUP, SWAP_EMPLOYEE, COMPANY_SHIFT, ROUTE_GROUP_NAME, ADD_REMOVE_EMP } from '../../../../../constant/urls';
import { FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Injectable({
  providedIn: 'root'
})
export class RoutePanelService {

  constructor(
    private _http: HttpService,
    private _uitilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _formService: FormService,
  ) { }


  addGroupConfi(data) {
    let apiType = 'post';
    return this._http[apiType](CREATE_GROUP, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(response['message']);
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }


  createNewGroups() {
    let apiType = 'post';
    return this._http[apiType](NEW_CREATE_GROUP).pipe(
      map(
        response => {
          // this._uitilityService.showAlert(COMMON_MESSAGES['ADDED']('New Group'));
          this._uitilityService.showAlert(response['message']);
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  swapeEmployees(data) {
    let apiType = 'put';
    return this._http[apiType](SWAP_EMPLOYEE, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(response['message']);
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  getGroups(data) {
    return this._http.get<any>(GET_ALL_GROUPS, data);
  }

  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }

  async approveGroup(value) {
    try {
      let apiType = 'put';
      let data = {
        // route -- Satyam
        message: `${COMMON_MESSAGES["APPROVED"].confirm('Route')}`
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = await this._http[apiType](APPROVE_GROUP, value).toPromise()
        response;
        // this._uitilityService.showAlert(COMMON_MESSAGES["APPROVED"].success('Group'));
        this._uitilityService.showAlert(response['message']);
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }


  mergeGroup(value) {
    let apiType = 'put';
    return this._http[apiType](MERGE_GROUP, value);
  }

  async dissolveGroup(value) {
    try {
      let apiType = 'put';
      let data = {
        // route -- Satyam
        message: `${COMMON_MESSAGES["DISSOLVE"].confirm('Route')}`
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = await this._http[apiType](DISSOLVE_GROUP, value).toPromise()
        response;
        // this._uitilityService.showAlert(COMMON_MESSAGES["DISSOLVE"].success('Group'));
        this._uitilityService.showAlert(response['message']);
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  async regenrateGroup(value) {
    try {
      let apiType = 'put';
      let data = {
        // route -- Satyam
        message: `${COMMON_MESSAGES["REGENRATE"].confirm('Route')}`
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = await this._http[apiType](REGENRATE_GROUP, value).toPromise()
        response;
        // this._uitilityService.showAlert(COMMON_MESSAGES["REGENRATE"].success('Group'));
        this._uitilityService.showAlert(response['message']);
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  createFilterObject() {
    return this._formBuilder.group(
      {
        "shiftName": "",

      }
    )
  }

  async updateRouteName(value) {
    try {
      let apiType = 'put';
      let data = {
        // route -- Satyam
        message: `${COMMON_MESSAGES["UPDATEDGROUP"].confirm('Route Name')}`
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = await this._http[apiType](ROUTE_GROUP_NAME, value).toPromise()
        response;
        this._uitilityService.showAlert(response['message']);
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Remove Users from group - Shivakumar A
  removeUsersFromGroup(data) {
    let apiType = 'put';
    return this._http[apiType](ADD_REMOVE_EMP, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert("User removed successfully");
          // console.log(response)
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }
}


