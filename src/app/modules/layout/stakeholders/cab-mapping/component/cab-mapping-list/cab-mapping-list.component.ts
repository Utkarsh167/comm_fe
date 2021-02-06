import { Component, OnInit } from "@angular/core";
import { Pagination } from "../../../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { CabMappingService } from "../../service/cab-mapping.service";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { AddMappingComponent } from "../add-mapping/add-mapping.component";
import * as _ from "underscore";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';

@Component({
  selector: "app-cab-mapping-list",
  templateUrl: "./cab-mapping-list.component.html",
  styleUrls: ["./cab-mapping-list.component.scss"]
})
export class CabMappingListComponent extends Pagination implements OnInit {
  displayedColumns = [
    "position",
    "cabBadge",
    "cabModel",
    "registrationNo",
    "seatingCapacity",
    "vendorName",
    "created",
    "driver",
    "action"
  ];
  cabs = new MatTableDataSource<Cab.Single>([]);
  filterForm: FormGroup;
  filterObject: any;
  vendors = [];
  selectedVendorId = "";
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;

  constructor(
    private _cabMappingService: CabMappingService,
    private _dialog: MatDialog
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._cabMappingService.createFilterObject(
      this.filterForm
    );
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
    this.searchVendor();
    this.getCabs();
  }

  createFilterForm() {
    this.filterForm = this._cabMappingService.getFilterForm();
  }

  getCabs() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      vendorId: this.selectedVendorId
    };
    this._cabMappingService.getMappedCabs(data).subscribe(
      response => {
        this.cabs.data = response.data.userList;
        this.total = response.data.totalCount;
      },
      err => {}
    );
  }

  searchVendor() {
    this._cabMappingService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    });
  }

  // searchVendor() {
  //   this.filterForm.controls.vendorId.valueChanges.pipe(
  //     distinctUntilChanged(),
  //     debounceTime(100),
  //     tap(x => {
  //       if (typeof x === 'string') {
  //         if (!x.trim()) {
  //           this.vendors = [];
  //         } else if (x.trim()) {
  //           this.vendors = this.vendors.filter(item => item.name.indexOf(x.trim()) >= 0)
  //         }
  //       }
  //     }),
  //     filter(x => (x && typeof x === 'string' && x.trim() && x.trim().length >= 0)),
  //     switchMap(data => this._cabMappingService.searchVendor(data))
  //   ).subscribe(
  //     response => {
  //       this.vendors = response.data;
  //     }
  //   )
  // }

  selectVendor(event) {
    this.selectedVendorId = event.value;
    // this.filterForm.get('vendorId').setValue(event.value.name)
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getCabs();
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
    this.getCabs();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getCabs();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.selectedVendorId = "";
    this.resetPages();
    this.getCabs();
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
    this.getCabs();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  addMapping(value?, cabData?) {
    let obj = {
      isEdit: value,
      cabData: cabData
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = obj;
    const dialogRef = this._dialog.open(AddMappingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetPages();
        this.getCabs();
      }
    });
  }

  async deleteMapping(cab) {
    let data = {
      driverId: cab.driverMapped._id,
      cabId: cab._id,
      shift: cab.driverMapped.shift.shift,
      shiftType: cab.driverMapped.shift.shiftType,
      mappedType: "Unassigned"
    };
    try {
      await this._cabMappingService.deleteMapping(data, cab);
      this.getCabs();
    } catch (err) {}
  }
}
