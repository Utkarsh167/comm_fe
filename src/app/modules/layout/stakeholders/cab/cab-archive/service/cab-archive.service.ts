import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { CAB_LIST } from '../../../../../../constant/urls';

@Injectable({
  providedIn: 'root'
})
export class CabArchiveService {

  constructor(
    private _http: HttpService,
  ) { }

  getCabs(data) {
    return this._http.get<Cab.List>(CAB_LIST, data);
  }
}
