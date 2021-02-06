import { Injectable } from '@angular/core';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { DASHBOARD, TRIP_HISTORY } from 'src/app/constant/urls';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getAllDashBoardData() {
    return this._http.get<any>(DASHBOARD);
  }

  getTripHistory(data) {
    return this._http.get<any>(TRIP_HISTORY,data);
  }

}


