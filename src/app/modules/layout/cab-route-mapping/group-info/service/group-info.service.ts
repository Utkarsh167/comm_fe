import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { GROUP_DETAIL, ADD_REMOVE_EMP, SEARCH_EMPLOYEE_BY_ID, EMP_FOR_GROUP } from '../../../../../constant/urls';
import { map, catchError } from 'rxjs/operators';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { COMMON_MESSAGES } from 'src/app/constant/messages';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupInfoService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getGroupDetail(routeId) {
    return this._http.get<any>(GROUP_DETAIL, { routeId });
  }

  getEmployees(data) {
    return this._http.get<Employee.List>(SEARCH_EMPLOYEE_BY_ID, data);
  }

  // satyam- emp for groups
  getEmployeesForGroup(data){
    return this._http.get<Employee.List>(EMP_FOR_GROUP, data);
  }

  addEmployee(data) {
    let apiType = 'put';
    return this._http[apiType](ADD_REMOVE_EMP, data).pipe(
      map(
        response => {
          this._utilityService.showAlert("Route Update successfully");
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

}
