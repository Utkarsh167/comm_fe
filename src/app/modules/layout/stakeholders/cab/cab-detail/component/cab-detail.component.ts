import { Component, OnInit } from '@angular/core';
import { CabDetailService } from '../service/cab-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CAB } from '../../../../../../constant/absolute-routes';
import { FUEL_TYPE, TRANSMISSION_TYPE, CAR_TYPE, RADIO_OPTION, getFileName } from '../../../../../../constant/app-constant';

@Component({
  selector: 'app-cab-detail',
  templateUrl: './cab-detail.component.html',
  styleUrls: ['./cab-detail.component.scss']
})
export class CabDetailComponent implements OnInit {

  cab: Cab.Detail;
  cabId: string;
  fuelType = FUEL_TYPE;
  transmissionType = TRANSMISSION_TYPE;
  carType = CAR_TYPE;
  radioOption = RADIO_OPTION;
  docs = [
    { value: "aggrementCopy", viewValue: 'Aggrement Copy' },
    { value: "companyIssuance", viewValue: 'Company Issuance' },
    { value: "rgsCertificate", viewValue: 'Registration Certificate' },
    { value: "fitnessCertificate", viewValue: 'Fitness Certificate' },
    { value: "roadTax", viewValue: 'Road Tax Experience' },
    { value: "insurance", viewValue: 'Insurance Experience' },
    { value: "statePermitForm", viewValue: 'State Permit Form-47' },
    { value: "allIndiaPermitForm", viewValue: 'All India Permit Form-49' }
  ];
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  constructor(
    private _cabDetailService: CabDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.cabId = this._route.snapshot.params.cabId;
    this.getCabDetail();
     // Assign value to medicalCabValue - Shivakumar A
     this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  getFileName(file) {
    return getFileName(file)
  }

  
  getCabDetail() {
    this._cabDetailService.getCabDetail(this.cabId).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([CAB]);
        }
        this.cab = response.data;
      },
      err => {
        this._router.navigate([CAB]);
      }
    )
  }

  getViewValue(type, value = null) {
    return this[value || type].filter(x => x.value === this.cab[type])[0].viewValue;
  }
  async changeStatus(status, cabId, isAssigned) {
    try {
      await this._cabDetailService.changeStatus({ status, cabId }, isAssigned);
      this.getCabDetail();
    } catch (err) {
    }
  }
}
