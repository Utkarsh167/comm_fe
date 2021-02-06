import { Component, OnInit, Input } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatDialogConfig
} from "@angular/material";
import { FormGroup } from "@angular/forms";
import { Pagination } from "src/app/models/pagination";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { TripHistoryListService } from "../../service/trip-history-list.service";
import { GroupEmployeeComponent } from "src/app/modules/shared/components/group-employee/group-employee.component";
import * as _ from "underscore";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';

@Component({
  selector: "app-login-trip",
  templateUrl: "./login-trip.component.html",
  styleUrls: ["./login-trip.component.scss"]
})
export class LoginTripComponent extends Pagination implements OnInit {
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  vendors: any = [];
  cabs: any = [];
  shifts: any[] = [];
  selectedVendorId: string;
  selectedCabId: string;
  selectedCabName: string;
  cabDriverId: string;
  rosterForm: FormGroup;
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;

  @Input() set loginTabChange(data: any) {
    if (data) {
      this.getAllLoginRoster();
    }
  }

  displayedColumns: string[] = [
    "position",
    "vendor",
    "driver",
    "cab",
    "cabModel",
    // "rosterName",
    "groupName",
    "startlocation",
    "endlocation",
    "employee",
    "shiftName",
    "shiftTime",
    "duration",
    // "validity",
    // "created",
    "rating"
  ];
  loginRoster = new MatTableDataSource<any>([]);

  constructor(
    public dialog: MatDialog,
    private _RoasterListService: TripHistoryListService,
    private _uitilityService: UtilityService
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._RoasterListService.createFilterObject(
      this.filterForm
    );
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
    this.getShifts();
    this.getAllLoginRoster();
  }

  getShifts() {
    this._RoasterListService.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

  createFilterForm() {
    this.filterForm = this._RoasterListService.getFilterForm();
  }

  getAllLoginRoster() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      shiftType: "login",
      tripStatus: 1
    };
    this._RoasterListService.getAllRoster(data).subscribe(
      response => {
        this.loginRoster.data = response.data.rosterList;
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
    // console.log(event);
    this.resetPages();
    this.getAllLoginRoster();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllLoginRoster();
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
    this.getAllLoginRoster();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllLoginRoster();
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
    this.getAllLoginRoster();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  openDetailDialog(empData): void {
    let obj = {
      employees: empData,
      isLogin: true
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = obj;
    const dialogRef = this.dialog.open(GroupEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
