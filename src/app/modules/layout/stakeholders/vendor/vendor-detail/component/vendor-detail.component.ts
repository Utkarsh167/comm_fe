import { Component, OnInit } from '@angular/core';
import { VendorDetailService } from '../service/vendor-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VENDOR } from '../../../../../../constant/absolute-routes';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit {

  vendor:Vendor.Detail;
  vendorId:string;

  constructor(
    private _vendorDetailService:VendorDetailService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this.vendorId = this._route.snapshot.params.vendorId;
    this.getVendorDetail();
  }

  getVendorDetail() {
    this._vendorDetailService.getVendorDetail(this.vendorId).subscribe(
      response => {
        this.vendor = response.data;
        if(!response.data) {
          this._router.navigate([VENDOR]);
        }
      },
      err => {
        this._router.navigate([VENDOR]);
      }
    )
  }
   // status - detail page -- satyam
   async changeStatus(status, userId) {
    try {
      let data = await this._vendorDetailService.changeStatus({
        status,
        userId
      });
      // console.log(data)
      if (data) {
        this.getVendorDetail();
      }
    } catch (err) {}
  }

}
