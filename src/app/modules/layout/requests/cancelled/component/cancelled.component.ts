import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { RequestListService } from "../../requests-list/service/request-list.service";
import { Pagination } from "src/app/models/pagination";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../constant/app-constant';
// filter -- satyam
import { FormGroup } from "@angular/forms";
import * as _ from "underscore";
import * as moment from "moment-timezone";

@Component({
  selector: "app-cancelled",
  templateUrl: "./cancelled.component.html",
  styleUrls: ["./cancelled.component.scss"]
})
export class CancelledComponent extends Pagination implements OnInit {
  @Input() set isCancelledTab(data: any) {
    if (data) {
      this.getCancelledRequest();
    }
  }

  // displayedColumns: string[] = [
  //   "position",
  //   "name",
  //   "email",
  //   "contact",
  //   "cabid",
  //   "scheduledfor",
  //   "tripdate",
  //   "pickup",
  //   "dropoff",
  //   "cancellreason"
  // ];

  // Added CreatedAt & Gender coloumn, empId - Shivakumar A
  displayedColumns: string[] = [
    "position",
    "name",
    "empId",
    "gender",
    "email",
    "contact",
    "cabid",
    "scheduledfor",
    "pickup",
    "dropoff",
    "shifttype",
    "cancellreason",
    "createdAt"
  ];
  cancelled = new MatTableDataSource<any>([]);
  // TotalPendingData - Shivakumar A
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
    this.total = 0;
    this.getCancelledRequest();
    // filter satyam
    this.getShifts();
  }

  getCancelledRequest() {
    // let data = { ...this.validPageOptions };
    // Pass FromCancelled - Shivakumar A
    // filter - satyam
    // let data = {...this.validPageOptions, FromCancelled:true};
    let data = { ...this.changeDateFormat(this.filterForm.value),...this.validPageOptions, FromCancelled:true};
    this._requestList.getCancelledRequests(data).subscribe(
      response => {
        this.cancelled.data = response.data.rescheduleList;
        this.total = response.data.totalCount;
        this.TotalPendingData = response.data;

        this._requestList.changeMessageData(this.TotalPendingData);
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
    this.getCancelledRequest();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getCancelledRequest();
  }
  // filter - satyam
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
    this.getCancelledRequest();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getCancelledRequest();
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
    this.getCancelledRequest();
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