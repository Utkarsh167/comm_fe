import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  HostListener,
  EventEmitter
} from "@angular/core";
import { Pagination } from "../../../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { DriverListService } from "../service/driver-list.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { invalidFileError } from "src/app/constant/messages";
import * as _ from "underscore";

@Component({
  selector: "app-driver-list",
  templateUrl: "./driver-list.component.html",
  styleUrls: ["./driver-list.component.scss"]
})
export class DriverListComponent extends Pagination implements OnInit {
  @ViewChild("upload_csv", { static: false })
  myInputVariable: ElementRef;
  displayedColumns = [
    "position",
    "image",
    "name",
    "driverId",
    "email",
    "mobileNo",
    "created",
    "status",
    "action"
  ];
  drivers = new MatTableDataSource<Driver.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  menu = false;

  constructor(
    private _driverListService: DriverListService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._driverListService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    this.getDrivers();
  }

  createFilterForm() {
    this.filterForm = this._driverListService.getFilterForm();
  }

  getDrivers() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      userType: 2
    };
    this._driverListService.getDrivers(data).subscribe(
      response => {
        // console.log(response);
        // console.log(data);
        this.drivers.data = response.data.userList;
        this.total = response.data.totalCount;
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
    this.getDrivers();
  }

  /*
    Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getDrivers();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getDrivers();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getDrivers();
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
    this.resetPages();
    this.getDrivers();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._driverListService.changeStatus({ status, userId });
      if (data) {
        this.getDrivers();
      }
    } catch (err) {}
  }

  async uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._driverListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = "";
            this.getDrivers();
          }
        },
        err => {}
      );
    } else {
      this._utilityService.showAlert(invalidFileError("'only xls file allowed  "));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = "";
    this.myInputVariable.nativeElement.value = "";
  }

  ngAfterViewInit() {}
}
