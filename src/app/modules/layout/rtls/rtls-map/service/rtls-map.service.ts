import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { CAB_ONLINE_LIST, GET_ALL_CAB_LIST } from '../../../../../constant/urls';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RtlsMapService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }


  getAllActiveCabs() {
    return this._http.get<CabMapList.Data>(CAB_ONLINE_LIST);
  }

  getAllCabs() {
    return this._http.get<any>(GET_ALL_CAB_LIST);
  }
}
