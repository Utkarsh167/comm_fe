import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { Pagination } from "src/app/models/pagination";
import { RequestListService } from "../../requests-list/service/request-list.service";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../constant/app-constant';
// filter -- satyam
import * as _ from "underscore";
import * as moment from "moment-timezone";

@Component({
  selector: "app-sos",
  templateUrl: "./sos.component.html",
  styleUrls: ["./sos.component.scss"]
})
export class SosComponent extends Pagination implements OnInit {
  @Input() set isSosTab(data: any) {
    if (data) {
      this.getAllSos();
    }
  }

  filterForm: FormGroup;
  showFilter: boolean = false;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  filterObject: any;
  sosRequests = new MatTableDataSource<Sos.UserList>([]);
  // filter -- satyam
  shifts: any;

  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;

  // displayedColumns: string[] = [
  //   "position",
  //   "name",
  //   "contact",
  //   "cabid",
  //   "cabReg",
  //   "driverName",
  //   "driverPhone",
  //   "pickup",
  //   "dropoff",
  //   "sosLocation",
  //   "message",
  //   "status",
  //   "action"
  // ];

  // Removed Message Coloumn from Array and added createdAt, empId & gender coloumn - Shivakumar A
  displayedColumns: string[] = [
    "position",
    "name",
    "empId",
    "gender",
    "contact",
    "cabid",
    "cabReg",
    "driverName",
    "driverPhone",
    "pickup",
    "dropoff",
    "sosLocation",
    "status",
    "createdAt",
    "action"
  ];
  

  constructor(private _requestList: RequestListService) {
    super();
    this.createFilterForm();
    this.filterObject = this._requestList.createFilterObject(this.filterForm);
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
     // filter satyam
     this.getShifts();
   }

  createFilterForm() {
    this.filterForm = this._requestList.getFilterForm();
  }

  /*
    Method For getting all the SOS request 
  */

  getAllSos() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions
    };
    this._requestList.getAllSosRequests(data).subscribe(
      response => {
        this.sosRequests.data = response.data.userList;
        this.total = response.data.totalCount;
      },
      err => {}
    );
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllSos();
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAllSos();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getAllSos();
  }

  /*
    Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
  }

  /*
      Method For Resetting The Filters
    */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllSos();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }

  /*
    Method For Applying The Filters
  */
  filter() {
    let a = Object.values(this.filterForm.value);
    let b = a.filter(Boolean);
    this.resetPages();
    this.getAllSos();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  async changeStatus(status, userId) {
    try {
      // Pageno & Limit Data for request - Shivakumar A
      let CancelledData = {
        ...this.changeDateFormat(this.filterForm.value),
        ...this.validPageOptions
      };
      let data = await this._requestList.changeSosStatus({ status, userId });
      if (data) {
        this.getAllSos();
        // to get all pendingcounts after data changes - Shivakumar A
        this._requestList.getCancelledRequests(CancelledData).subscribe(response =>{
          this._requestList.changeMessageData(response.data);
        })
      }
    } catch (err) {}
  }
  // filter --satyam
  getShifts() {
    this._requestList.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }
}
