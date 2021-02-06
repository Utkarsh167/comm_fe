import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-onboard-offboard',
  templateUrl: './employee-onboard-offboard.component.html',
  styleUrls: ['./employee-onboard-offboard.component.scss']
})
export class EmployeeOnboardOffboardComponent implements OnInit {

  // empOnboardedData: any;
  // empOffboardedData: any;

  // Added tripOntime, totalTripCount - Shivakumar A
  tripOnTime: any;
  totalTripCount: any;

  @Input() set empOnboard(data: any) {
    if (data) {
      // this.empOnboardedData = data[0][0].onboardedEmployees;
      // this.empOffboardedData = data[0][0].offBoardedEmployees;

      // Added trip counts - Shivakumar A
      this.tripOnTime = data[0].tripOnTime;
      this.totalTripCount = data[0].totalTripCount;
      this.totalTripCount.forEach(elementTripCount => {
       this.tripOnTime.forEach(elementTrip => {
         if(elementTrip._id.shiftName === elementTripCount._id.shiftName){
          elementTrip.totalTrips = elementTripCount.count;
         }
       });
      });
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
