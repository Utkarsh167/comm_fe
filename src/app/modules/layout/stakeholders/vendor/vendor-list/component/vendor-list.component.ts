import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Pagination } from "../../../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { VendorListService } from "../service/vendor-list.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { invalidFileError } from "src/app/constant/messages";
import * as _ from "underscore";

@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.scss"]
})
export class VendorListComponent extends Pagination implements OnInit {
  @ViewChild("upload_csv", { static: false })
  myInputVariable: ElementRef;
  displayedColumns = [
    "position",
    "image",
    "name",
    "vendorId",
    "email",
    "contactNo",
    "created",
    "cabs",
    "status",
    "action"
  ];
  vendors = new MatTableDataSource<Vendor.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  menu = false;

  constructor(
    private _vendorListService: VendorListService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._vendorListService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    this.getVendors();
  }

  createFilterForm() {
    this.filterForm = this._vendorListService.getFilterForm();
  }

  getVendors() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions
    };
    this._vendorListService.getVendors(data).subscribe(
      response => {
        this.vendors.data = response.data.userList;
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
    this.getVendors();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getVendors();
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
    this.getVendors();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getVendors();
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
    this.getVendors();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._vendorListService.changeStatus({ status, userId });
      if (data) {
        this.getVendors();
      }
    } catch (err) {}
  }

  async uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._vendorListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = "";
            this.getVendors();
          }
        },
        err => {}
      );
    } else {
      this._utilityService.showAlert(invalidFileError("only xls file allowed"));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = "";
    this.myInputVariable.nativeElement.value = "";
  }

  ngAfterViewInit() {}
}
