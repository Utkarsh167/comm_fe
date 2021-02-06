import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Pagination } from "../../../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { EmployeeListService } from "../service/employee-list.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { invalidFileError } from "src/app/constant/messages";
import * as moment from "moment-timezone";
import * as _ from "underscore";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent extends Pagination implements OnInit {
  @ViewChild("upload_csv", { static: false })
  myInputVariable: ElementRef;
  displayedColumns = [
    "position",
    "name",
    "empId",
    "email",
    "contactNo",
    "created",
    "shiftName",
    "startTime",
    "endTime",
    "status",
    "pickupLocation",
    "action"
  ];
  employees = new MatTableDataSource<Employee.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  shifts: any[] = [];
  menu = false;

  constructor(
    private _employeeListService: EmployeeListService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._employeeListService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    this.getShifts();
    this.getEmployees();
  }

  createFilterForm() {
    this.filterForm = this._employeeListService.getFilterForm();
  }

  getEmployees() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      userType: 1
    };
    this._employeeListService.getEmployees(data).subscribe(
      response => {
        // console.log(response);
        this.employees.data = response.data.userList;
        this.total = response.data.totalCount;
      },
      err => {}
    );
  }

  getShifts() {
    this._employeeListService.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

  setTime(date) {
    return moment
      .utc(date, "HH:mm:ss")
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("hh:mm A");
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getEmployees();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getEmployees();
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
    this.getEmployees();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getEmployees();
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
    this.getEmployees();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._employeeListService.changeStatus({
        status,
        userId
      });
      if (data) {
        this.getEmployees();
      }
    } catch (err) {}
  }

  uploadCSV(e) {
    const file = e.target.files[0];
    // console.log(file);
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._employeeListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = "";
            this.getEmployees();
          }
        },
        err => {}
      );
    } else {
      this._utilityService.showAlert(invalidFileError("only xls file allowed  "));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = "";
    this.myInputVariable.nativeElement.value = "";
  }

  ngAfterViewInit() {}
}
