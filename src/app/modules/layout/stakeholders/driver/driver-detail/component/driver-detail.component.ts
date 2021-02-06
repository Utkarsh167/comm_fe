import { Component, OnInit } from '@angular/core';
import { DriverDetailService } from '../service/driver-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DRIVER } from '../../../../../../constant/absolute-routes';
import { DOCUMENT_TYPES, DRINK_STATUS, RADIO_OPTION, getFileName } from '../../../../../../constant/app-constant';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent implements OnInit {

  driver: Driver.Detail;
  driverId: string;

  documentTypes = DOCUMENT_TYPES;
  addressProof: string;
  dlUrl: string;
  leftPalmUrl: string;
  rightPalmUrl: string;

  drinkStatus = DRINK_STATUS;
  radioOptions = RADIO_OPTION;

  constructor(
    private _driverDetailService: DriverDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.driverId = this._route.snapshot.params.driverId;
    this.getDriverDetail();
  }

  getDriverDetail() {
    this._driverDetailService.getDriverDetail(this.driverId).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([DRIVER]);
        }
        this.driver = response.data;

        let addressProof = this.driver.documents.filter(x => x.type === this.documentTypes.addressProof)[0];
        let dl = this.driver.documents.filter(x => x.type === this.documentTypes.fullDl)[0];
        let leftPalm = this.driver.documents.filter(x => x.type === this.documentTypes.leftPalm)[0];
        let rightPalm = this.driver.documents.filter(x => x.type === this.documentTypes.rightPalm)[0];

        this.addressProof = addressProof ? addressProof.frontImageUrl : '';
        this.dlUrl = dl ? dl.frontImageUrl : '';
        this.leftPalmUrl = leftPalm ? leftPalm.frontImageUrl : '';
        this.rightPalmUrl = rightPalm ? rightPalm.frontImageUrl : '';
      },
      err => {
        this._router.navigate([DRIVER]);
      }
    )
  }

  getFileName(file) {
    return getFileName(file)
  }
  
  getDrunkStatus(value) {
    return this.drinkStatus.filter(x => x.value == value)[0] ? this.drinkStatus.filter(x => x.value == value)[0].viewValue : '';
  }

  getRadioStatus(value) {
    return this.radioOptions.filter(x => x.value == value)[0] ? this.radioOptions.filter(x => x.value == value)[0].viewValue : '';
  }
  async changeStatus(status, userId) {
    try {
      let data = await this._driverDetailService.changeStatus({ status, userId });
      if (data) {
        this.getDriverDetail();
      }
    } catch (err) {}
  }
}
