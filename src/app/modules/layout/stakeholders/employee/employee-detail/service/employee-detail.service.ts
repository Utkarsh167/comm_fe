import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { USER_DETAIL,USER_LIST, BLOCK_USER, USER, UPLOAD_BULK_EMP, COMPANY_SHIFT, GET_ALL_ROSTER  } from '../../../../../../constant/urls';
// status - detail page -- satyam
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { UtilityService } from '../../../../../shared/services/utility.service';
// employeeDetails -- satyam
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Injectable()
export class EmployeeDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _formService: FormService,
  ) { }

  getEmployeeDetail(userId) {
    return this._http.get(USER_DETAIL, { userId });
  }
  // status - detail page -- satyam
  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Employee'),
        // reasonForArchive
        showTextBox: status === 'DELETED' ? true : false,
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          // reasonForArchive
          // this._http.delete(USER + body.userId ).toPromise() :
          this._http.post(USER + body.userId ,{ comment: success.note}).toPromise() :
          this._http.post(BLOCK_USER + body.userId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Employee'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
  // employeeDetails roster -- satyam
  getAllRoster(data) {
    return this._http.get<any>(GET_ALL_ROSTER, data);
  }
  // employeeDetails roster -- satyam
  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate,
        // dateValidation -- satyam
        fromDetails: true,
      },
      // shiftType: {
      //   label: 'Shift Type',
      //   list: [
      //     { viewValue: 'Login Trips', value: 'login' },
      //     { viewValue: 'Logout Trips', value: 'logout' }
      //   ],
      //   control: form.controls.shiftType
      // },
      // userType: {
      //   label: 'User Type',
      //   list: [
      //     { viewValue: 'DRIVER', value: 2 },
      //     { viewValue: 'EMPLOYEE', value: 1 }
      //   ],
      //   control: form.controls.userType
      // }
    }
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate']))
  }
}
