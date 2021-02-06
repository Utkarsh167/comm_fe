import { Component, OnInit, Input } from '@angular/core';
import { CAR_TYPE } from '../../../../../../constant/app-constant';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  cabDetails: object;
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  // startLocation -- satyam
  shiftTypeLogin = false;
  shiftTypeLogout = false;

  @Input() set mapData(data: any) {
    if (data) {
      this.cabDetails = data;
      if (this.cabDetails['route'].shiftType == 'login'){
        this.shiftTypeLogin = true;
      }else{
        this.shiftTypeLogout = true;
      }
      // console.log(this.cabDetails);
    }
    else {
      this.cabDetails = null;
    }
  }
  constructor() { 
     // Assign value to medicalCabValue - Shivakumar A
     this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
  }

}
