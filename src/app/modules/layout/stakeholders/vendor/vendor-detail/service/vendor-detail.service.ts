import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { VENDOR_DETAIL,BLOCK_VENDOR, VENDOR, USER, } from '../../../../../../constant/urls';
// status - detail page -- satyam
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { UtilityService } from '../../../../../shared/services/utility.service';

@Injectable()
export class VendorDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getVendorDetail(userId) {
    return this._http.get<any>(VENDOR_DETAIL, { userId });
  }
  // status - detail page -- satyam
  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Vendor'),
        // reasonForArchive
        showTextBox: status === 'DELETED' ? true : false,
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          // reasonForArchive
          // this._http.delete(VENDOR + "/" + body.userId).toPromise() :
          this._http.post(VENDOR + "/" + body.userId, { comment: success.note}).subscribe(response=>{
            this._utilityService.showAlert(response.message)

          }) :
          this._http.post(BLOCK_VENDOR + body.userId, { status: body.status }).subscribe(response=>{
            this._utilityService.showAlert(response.message)

          },error=>{
            this._utilityService.showAlert(error.message)

          });
        await response;
       // this._utilityService.showAlert(COMMON_MESSAGES[status].success('Vendor'))
        return Promise.resolve(response);
      } else {
        
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
