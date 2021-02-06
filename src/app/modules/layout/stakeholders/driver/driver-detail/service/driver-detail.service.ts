import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { USER_DETAIL,BLOCK_USER, USER, } from '../../../../../../constant/urls';
// status -- satyam
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { UtilityService } from '../../../../../shared/services/utility.service';

@Injectable()
export class DriverDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService

  ) { }

  getDriverDetail(userId) {
    return this._http.get<Driver.Detail>(USER_DETAIL, { userId });
  }
  // status --satyam
  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Driver'),
         // reasonForArchive
         showTextBox: status === 'DELETED' ? true : false,
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          // reasonForArchive
          // this._http.delete(USER + body.userId).toPromise() :
          this._http.post(USER + body.userId,{ comment: success.note}).toPromise() :
          this._http.post(BLOCK_USER + body.userId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Driver'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
