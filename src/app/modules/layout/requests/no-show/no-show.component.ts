// Added this Component - Shivakumar A
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { RequestListService } from "../requests-list/service/request-list.service";
import { Pagination } from "src/app/models/pagination";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../constant/app-constant';
// filter -- satyam
import { FormGroup } from "@angular/forms";
import * as _ from "underscore";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-no-show',
  templateUrl: './no-show.component.html',
  styleUrls: ['./no-show.component.scss']
})
export class NoShowComponent extends Pagination implements OnInit {

  @Input() set isNoShowTab(data: any) {
    if (data) {
      this.getAllnoShow();
    }
  }
  

   displayedColumns: string[] = [
    "position",
    "name",
    "employeeId",
    "gender",
    "contact",
    "cabid",
    "scheduledfor",
    "pickup",
    "dropoff",
    "shifttype",
    "noshowreason",
    "createdAt"
  ];
  noshow = new MatTableDataSource<any>([]);
 
  TotalPendingData: any;

  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
    // filter -- satyam
    filterForm: FormGroup;
    filterObject: any;
    appliedFilterCount: number = 0;
    isFilterApplied: boolean = false;
    shifts: any;

  constructor(private _requestList: RequestListService) {
    super();
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
      // filter -- satyam
      this.createFilterForm();
      this.filterObject = this._requestList.createFilterObject(
        this.filterForm
        );
     
  }

  ngOnInit() {
     // filter satyam
     this.getShifts();
  }

  getAllnoShow() {
    // filter - satyam
    // let data = {...this.validPageOptions };
    let data = {...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions };
    this._requestList.getNoShowRequests(data).subscribe(
      response => {
        this.noshow.data = response.data.noshowList;
        this.total = response.data.totalCount;
        this.TotalPendingData = response.data;
        
        // this._requestList.changeMessageData(this.TotalPendingData);
      },
      err => {}
    );
  }

   /*
    Method For Sorting
  */
 sortData(event) {
  this.sortOptions = event;
  this.resetPages();
  this.getAllnoShow();
}

/*
  Method For Changing The Pagination
*/
changePage(event: MatPaginator) {
  this.pageOptionsOnChange = event;
  if (this.total == 0) {
    return;
  }
  this.getAllnoShow();
}
createFilterForm() {
  this.filterForm = this._requestList.getFilterForm();
}

setTime(date) {
  return moment
    .utc(date, "HH:mm:ss")
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("hh:mm A");
}

/*
Method For Checking Filter Button Shoud Be Enable Or Not
*/
disable() {
  return !this.filterForm.dirty;
}

/*
  Method For Searching
*/
setSearch(event) {
  this.search = event;
  this.resetPages();
  this.getAllnoShow();
}

/*
  Method For Resetting The Filters
*/
resetFilter() {
  this.filterForm.reset();
  this.resetPages();
  this.getAllnoShow();
  this.appliedFilterCount = 0;
  this.isFilterApplied = false;
}
/*
  Method For Applying The Filters
*/

filter() {
  let a = Object.values(this.filterForm.value);
  let b = _.filter(a, function(num) {
    return num != null;
  });
  // let b = a.filter(Boolean);
  this.resetPages();
  this.getAllnoShow();
  this.appliedFilterCount = b.length;
  this.isFilterApplied = true;
}
getShifts() {
  this._requestList.getCompanyShift().subscribe(
    response => {
      this.shifts = response.data.shiftSlot;
    },
    err => {}
  );

}
}
