import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { VENDOR_LIST } from '../../../../../../constant/urls';

@Injectable({
  providedIn: 'root'
})
export class VendorArchiveService {

  constructor(
    private _http: HttpService,
  ) { }


  getVendors(data) {
    return this._http.get<Vendor.List>(VENDOR_LIST, data);
  }

}
