import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
// imported NOSHOW_LIST - Shivakumar A
// imported COMPANY_SHIFT - Satyam
// imported CET_CAB_CRF -- satyam
import { GET_ALL_SOS, REJECT_SOS, RESOLVE_SOS, GET_ALL_OTHERREQUEST, REJECT_OTHER, RESOLVE_OTHER, RESCHEDULED_LIST, CANCELLED_LIST, GET_CAB_FOR_ROSTER, APPROVE_RESCHEDULE, CANCEL_RESCHEDULE, USER_LIST, APPROVE_ADDRESS_CHANGE_REQUEST, NOSHOW_LIST, COMPANY_SHIFT, GET_CAB_CRF } from 'src/app/constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';
import { VENDOR } from 'src/app/constant/routes';
import { map, catchError } from 'rxjs/operators';
// imported BehaviorSubject - Shivakumar A
import { throwError,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestListService {
  // Observe data changes to get requests counts - Shivakumar A
  private messageFromCancelled = new BehaviorSubject(0);
  TotalPendingData = this.messageFromCancelled.asObservable();
  totalCount: any
  
  constructor(private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService) { }

    //get all pending data from cancelled component - Shivakumar A
    changeMessageData(data: any) {
      this.messageFromCancelled.next(data)
      this.totalCount = data.pendingSosCount + data.pendingAddressCount + data.pendingRescheduleCount + data.pendingOtherRequestsCount + data.pendingCancelledCount+ data.pendingNoShowCount;
      localStorage.setItem('COUNT', this.totalCount);
    }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      shiftType: {
        label: 'Shift Type',
        list: [
          { viewValue: 'Login Trips', value: 'login' },
          { viewValue: 'Logout Trips', value: 'logout' }
        ],
        control: form.controls.shiftType
      },
      userType: {
        label: 'User Type',
        list: [
          { viewValue: 'DRIVER', value: 2 },
          { viewValue: 'EMPLOYEE', value: 1 }
        ],
        control: form.controls.userType
      }
    }
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate','shiftType','shiftName','userType']))
  }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }
  // CRF change -- satyam
  // getCabsForRoster(data) {
  //   return this._http.get<any>(GET_CAB_FOR_ROSTER, data);
  // }
  getCabsForRoster(data) {
    let apiType = 'post';
    return this._http[apiType](GET_CAB_CRF, data)
  }


  createCabForm() {
    return this._formBuilder.group(
      {
        "vendorId": this._formService.getControl('dropdown'),
        "cabId": this._formService.getControl('dropdown'),
      }
    )
  }



  getAllSosRequests(data) {
    return this._http.get<Sos.Data>(GET_ALL_SOS, data);
  }

  getAllOtherRequests(data) {
    return this._http.get<Sos.Data>(GET_ALL_OTHERREQUEST, data);
  }

  getRescheduleRequests(data) {
    return this._http.get<any>(RESCHEDULED_LIST, data);
  }

  getCancelledRequests(data) {
    return this._http.get<any>(CANCELLED_LIST, data);
  }

  getUpdatedAddressRequest(data) {
    return this._http.get<Employee.List>(USER_LIST, data);
  }

  // getNoShowRequests - Shivakumar A
  getNoShowRequests(data) {
    return this._http.get<any>(NOSHOW_LIST, data);
  }

  async changeSosStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Sos')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'REJECT' ?
          await this._http.put(REJECT_SOS + body.userId, '').toPromise() :
          await this._http.put(RESOLVE_SOS + body.userId, '').toPromise();
        response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Sos'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }


  async changeOtherRequestStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Sos')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'REJECT' ?
          await this._http.put(REJECT_OTHER + body.userId, '').toPromise() :
          await this._http.put(RESOLVE_OTHER + body.userId, '').toPromise();
        response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Sos'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }


  async approveRescheduleRequest(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Reschedule Request')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        // let response = await this._http.put(APPROVE_RESCHEDULE, body).toPromise()
        let response = status === 'APPROVED' ?
          await this._http.put(APPROVE_RESCHEDULE, body.obj).toPromise() :
          await this._http.put(CANCEL_RESCHEDULE, body.obj).toPromise();
        response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Reschedule Request'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  approveRequest(data) {
    let apiType = 'put';
    return this._http[apiType](APPROVE_RESCHEDULE, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES['UPDATED']('Request'));
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
      let status = body.actionType.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Employee address request')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response =
          this._http.put(APPROVE_ADDRESS_CHANGE_REQUEST, body).toPromise()
        await response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Employee Request'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }


}


