import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { CAB_DETAIL,BLOCK_CAB, CAB } from '../../../../../../constant/urls';
// status -- satyam
import { COMMON_MESSAGES, CAB_ASSIGNED } from '../../../../../../constant/messages';
import { UtilityService } from '../../../../../shared/services/utility.service';

@Injectable()
export class CabDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getCabDetail(cabId) {
    return this._http.get<Cab.Detail>(CAB_DETAIL, { cabId });
  }
  // satyam -- status
  async changeStatus(body, isAssigned) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: `${isAssigned && body.status !== 'unblocked' ? CAB_ASSIGNED : ''}${COMMON_MESSAGES[status].confirm('Cab')}`,
         // reasonForArchive
         showTextBox: status === 'DELETED' ? true : false,
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          // reasonForArchive -- satyam
          // this._http.delete(`${CAB}/${body.cabId}`).toPromise() :
          this._http.post(`${CAB}/${body.cabId}`,{ comment: success.note}).toPromise() :
          this._http.post(BLOCK_CAB + body.cabId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Cab'))
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
