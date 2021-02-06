import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatDialogConfig
} from "@angular/material";
import { GroupEmployeeComponent } from "src/app/modules/shared/components/group-employee/group-employee.component";
import { FormGroup } from "@angular/forms";
import { Pagination } from "src/app/models/pagination";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { RouteRosterListService } from "../../service/route-roster-list.service";
import { EditRosterComponent } from "../../dialog/edit-roster/edit-roster.component";
import * as _ from "underscore";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';
// merge roster -- satyam
import { SelectionModel } from '@angular/cdk/collections';
import { MergeRosterComponent } from "../../dialog/merge-roster/merge-roster.component";
@Component({
  selector: "app-login-ride",
  templateUrl: "./login-ride.component.html",
  styleUrls: ["./login-ride.component.scss"]
})
export class LoginRideComponent extends Pagination implements OnInit {
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
  // new roster flow -- satyam
  selectedOrders = [];
  selectedGroup: any = [];

  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  selection = new SelectionModel<any>(true, []);

  @Input() set loginTabChange(data: any) {
    if (data) {
      this.getAllLoginRoster();
    }
  }
  @Output() rosterEndDate = new EventEmitter<any>();

  displayedColumns: string[] = [
    "check",
    "position",
    "vendor",
    "cab",
    "cabModel",
    "regNo",
    // "rosterName",
    "name",
    "groupName",
    "shiftName",
    "shiftTime",
    "startlocation",
    "endlocation",
    "employee",
    "duration",
    "validity",
    "created",
    "action"
  ];
  loginRoster = new MatTableDataSource<any>([]);

  constructor(
    public dialog: MatDialog,
    private _RoasterListService: RouteRosterListService,
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
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    this.filterForm.controls.fromDate.setValue(date);
     /* Added toDate to get current roaster data - Shivakumar A */
    // this.filterForm.controls.toDate.setValue(date);
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
      tripStatus: 2
    };
    this._RoasterListService.getAllRoster(data).subscribe(
      response => {
        this.loginRoster.data = response.data.rosterList;
        this.total = response.data.totalCount;
        if (this.loginRoster.data[0]) {
          this.rosterEndDate.emit(this.loginRoster.data[0].validTill);
        }
      },
      err => {}
    );
  }

  setDateFilter() {
    this.filterForm.patchValue({
      fromDate: this.filterForm.controls.fromDate.value,
      toDate: this.filterForm.controls.fromDate.value
    }),
      this.getAllLoginRoster();
  }

  /*
   Method For Sorting
 */
  sortData(event) {
    this.sortOptions = event;
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

  openEditModel(group: any): void {
    let data = {
      shiftTime: group.route.shiftTime,
      shiftType: group.route.shiftType,
      rosterbadge: group.roasterBadge,
      tripTime: group.route.totalTripTime,
      employee: group.route.empCount,
      rosterDate: group.rosterDate,
      rosterId: group._id
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(EditRosterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllLoginRoster();
      }
    });
  }
  // new roster flow -- satyam
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.loginRoster.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  groupSelect(event, data) { // For selecting the order by check box
    // let obj;
    console.log(data);
    console.log(event);
    if (event){
      this.selectedGroup.push(data);
    }else {
      let tempGroup = []
      this.selectedGroup.forEach(element => {
        if (element._id == data._id){
          
        }else {
          tempGroup.push(element);
        }
      });
      this.selectedGroup = tempGroup;
    }
    console.log(this.selectedGroup);  
  }

  mergeRosters (){
    // console.log(this.selectedGroup);
    if (!this.selectedGroup.length ) {
      this._uitilityService.showAlert("Please select the rosters");
      return;
    }
    if (this.selectedGroup.length == 1){
      this._uitilityService.showAlert("Please select atleast 2 rosters");
      return;
    }
    let shiftName = this.selectedGroup[0].route.shiftName;
    let shiftType = this.selectedGroup[0].route.shiftType;
    let flag = 0;
    this.selectedGroup.forEach(element => {
        if (element.route.shiftType != shiftType || element.route.shiftName != shiftName ){
        this._uitilityService.showAlert("Please select the rosters of same shift");
        flag = 1;
      }
    });
    if (flag == 1){
      return ;
    }
    let data = {
      rosterData: this.selectedGroup,
      fromDate: this.changeDateFormat(this.filterForm.value).fromDate
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(MergeRosterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedGroup = [];
        this.getAllLoginRoster();
      }
    });
  }
}
