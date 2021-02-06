import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from '../service/employee-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPLOYEES } from '../../../../../../constant/absolute-routes';
// rosterDetails -- satyam
import { Pagination } from "src/app/models/pagination";
import { FormGroup } from "@angular/forms";
import * as _ from "underscore";
import * as moment from "moment-timezone";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatDialogConfig
} from "@angular/material";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
// roasterDetails -- satyam
// export class EmployeeDetailComponent implements OnInit {
  export class EmployeeDetailComponent extends Pagination implements OnInit {

  employee: any;
  employeeId: string;
  // User Counts -- satyam
  cancelledTripCount: any;
  rescheduleTripCount: any;
  noShowCount: any;
  // roasterDetails -- satyam
  displayedColumns: string[] = [
    "position",
    "vendor",
    "cab",
    "cabModel",
    "regNo",
    // "rosterName",
    "name",
    "groupName",
    "shiftName",
    // shiftName-- satyam
    "shiftTime",
    "pickupTime",
    "tripType",
    "startlocation",
    "endlocation",
    // employeeStatus -- satyam
    "status",
    // "employee",
    "duration",
    "validity",
    "created"
  ];
  loginRoster = new MatTableDataSource<any>([]);
  // employeeDetails -- satyam
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  shifts: any;


  constructor(
    private _employeeDetailService: EmployeeDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    super();
    // employeeDetails-- satyam
    this.createFilterForm();
    this.filterObject = this._employeeDetailService.createFilterObject(
      this.filterForm
    );
   }

  ngOnInit() {
    this.employeeId = this._route.snapshot.params.employeeId;
    this.getEmployeeDetail();
    this.total = 0;
    
    // console.log(this.total);
  }

  getEmployeeDetail() {
    this._employeeDetailService.getEmployeeDetail(this.employeeId).subscribe(
      response => {
        // console.log(response)
        if (!response.data) {
          this._router.navigate([EMPLOYEES]);
        }
        this.employee = response.data;
        this.getAllRoster();
        // User Counts -- satyam
        this.cancelledTripCount = response["data3"];
        this.rescheduleTripCount = response["data2"];
        this.noShowCount = response["data4"]
        
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    )
  }
  // status - detail page -- satyam
  async changeStatus(status, userId) {
    try {
      let data = await this._employeeDetailService.changeStatus({
        status,
        userId
      });
      if (data) {
        this.getEmployeeDetail();
      }
    } catch (err) {}
  }
  // roasterDetails -- satyam
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    // this.getAllLoginRoster();
  }
    /*
   Method For Sorting
 */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    // this.getAllLoginRoster();
  }
  getAllRoster() {
    let data = {...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      tripStatus: 5,
      employeeId:this.employee.employeeId   
    };
    // delete data.fromDate;
    this._employeeDetailService.getAllRoster(data).subscribe(
      response => {
        this.loginRoster.data = response.data.rosterList;
        this.total = response.data.totalCount;
        // tripStatus -- satyam
        this.loginRoster.data.forEach(roster => {
          roster.route.employees.forEach(emp => {
            if(emp.employeeId == this.employee.employeeId){
              roster.route.pickUpStatus = emp.pickupStatus;
              roster.route.pickupTime = emp.empPickupTime;
            }
          });
          
        })
      },
      err => {}
    );
  }
  // filter - satyam
  createFilterForm() {
    this.filterForm = this._employeeDetailService.getFilterForm();
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
    this.getAllRoster();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllRoster();
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
    this.getAllRoster();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

}
