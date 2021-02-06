import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { UtilityService } from '../../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
import { SINGLE_CAB_DEATIL } from '../../../../../../constant/urls';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CabViewService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }


  getSingleCabView(id) {
    return this._http.get<any>(SINGLE_CAB_DEATIL, id);
  }
}
