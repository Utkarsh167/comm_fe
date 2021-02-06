import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Pagination } from "../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { BillingService } from "../service/billing.service";
import {ExcelService} from 'src/app/modules/shared/services/excel.service';

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"]
})
export class BillingComponent extends Pagination implements OnInit {
  @ViewChild("upload_csv", { static: false })
  myInputVariable: ElementRef;
  menu = false;
  displayedColumns = [
    "position",
    "vendor",
    "cab",
    "shiftType",
    "shiftTime",
    "tripType",
    "startLocation",
    "endLocation",
    "rosterDate",
  ];
  billing = new MatTableDataSource<Employee.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  shifts: any[] = [];
  maxDateFrom = new Date();
  maxDateTo = new Date();

  constructor(
    private _billingService: BillingService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef,
    private excelService: ExcelService
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._billingService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 10);
    this.filterForm.controls.fromDate.setValue(date);
    let date1 = new Date();

    date1.setHours(0, 0, 0, 0);
    date1.setDate(date1.getDate() - 1);
    this.maxDateTo = date1;
    this.maxDateFrom = date1;
    this.filterForm.controls.toDate.setValue(date1);
    this.getBillingDetails();
    // this.filterForm.controls.fromDate.setValue();
    // this.filterForm.controls.toDate.setValue(date.setDate(date.getDate() - 1));
  }

  createFilterForm() {
    this.filterForm = this._billingService.getFilterForm();
  }

  getBillingDetails() {
    let fromDate = new Date();
    console.log(this.filterForm.value);
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
    };
    this._billingService.getBillingData(data).subscribe(
      response => {
        console.log(response);
        this.billing.data = response.data.rosterList;
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
    this.getBillingDetails();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getBillingDetails();
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
    this.getBillingDetails();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getBillingDetails();
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
    this.getBillingDetails();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }
  dateChange(value){
    // this.minDateTo = this.filterForm.value.fromDate;
    // this.filterForm.controls.toDate.setValue(this.filterForm.value.fromDate);
    this.getBillingDetails();
  }
  dateChangeTo(value){
    this.maxDateFrom = this.filterForm.value.toDate;
    // this.filterForm.controls.toDate.setValue(this.filterForm.value.fromDate);
    this.getBillingDetails();
  }
  downloadReport(){
    console.log("true");
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      pageNo: 0,
      limit: 0
    };
    this._billingService.getBillingData(data).subscribe(
      response => {
        console.log(response);
        response.data.rosterList.forEach(element => {
          let date = new Date(element.rosterDate).toLocaleDateString();
          console.log(date);
          element.rosterDate = date;
          if (element.tripType === 'empty'){
            element.shiftType = '-';
          }
          delete element.route

        });
        let fromdate = new Date(this.filterForm.value.fromDate) ;
        let todate = new Date(this.filterForm.value.toDate);
        let str = fromdate.toLocaleDateString() + ' - ' + todate.toLocaleDateString()+ ' billingReport';
        console.log(str);
        this.excelService.exportAsExcelFile(response.data.rosterList,str);
      },
      err => {}
    );
  }
}
