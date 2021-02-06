import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { Pagination } from "src/app/models/pagination";
import { ServiceListService } from "../../../service/service-list.service";
import { FormGroup } from "@angular/forms";
import * as _ from "underscore";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent extends Pagination implements OnInit {
  @Input() set historyTabChange(data: any) {
    if (data) {
      this.getEmployees();
    }
  }
  constructor(private _employeeListService: ServiceListService) {
    super();
    this.createFilterForm();
    this.filterObject = this._employeeListService.createFilterObject(
      this.filterForm
    );
  }

  // displayedColumns: string[] = [
  //   "position",
  //   "name",
  //   "empid",
  //   "email",
  //   "starttime",
  //   "endtime",
  //   "shiftName",
  //   "weekend"
  // ];

  // Added gender - Shivakumar A
  displayedColumns: string[] = [
    "position",
    "name",
    "empid",
    "gender",
    "email",
    "starttime",
    "endtime",
    "shiftName",
    "weekend"
  ];
  employees = new MatTableDataSource<Employee.Detail>([]);
  shifts: any[] = [];
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;

  ngOnInit() {
    this.getShifts();
  }

  createFilterForm() {
    this.filterForm = this._employeeListService.getFilterForm();
  }

  getShifts() {
    this._employeeListService.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

  getEmployees() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      status: "expired"
    };
    this._employeeListService.getShiftRequest(data).subscribe(
      response => {
        this.employees.data = response.data.shiftRequestList;
        this.total = response.data.totalCount;
      },
      err => {}
    );
  }

  filter() {
    let a = Object.values(this.filterForm.value);
    let b = _.filter(a, function(num) {
      return num != null;
    });
    this.resetPages();
    this.getEmployees();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getEmployees();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }

  disable() {
    return !this.filterForm.dirty;
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
      Method For Searching
    */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getEmployees();
  }
}
