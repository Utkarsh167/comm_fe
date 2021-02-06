import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pagination } from '../../../../../../models/pagination';
import { FormGroup } from '@angular/forms';
import { CabListService } from '../service/cab-list.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { distinctUntilChanged, debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { invalidFileError } from 'src/app/constant/messages';
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';
import * as _ from "underscore";
@Component({
  selector: 'app-cab-list',
  templateUrl: './cab-list.component.html',
  styleUrls: ['./cab-list.component.scss']
})
export class CabListComponent extends Pagination implements OnInit {

  @ViewChild('upload_csv', { static: false })
  myInputVariable: ElementRef;
  displayedColumns = ['position', 'cabBadge', 'cabModel', 'registrationNo', 'seatingCapacity', 'vendorName', 'created', 'isAssigned', 'status', 'action'];
  cabs = new MatTableDataSource<Cab.Single>([]);
  filterForm: FormGroup;
  filterObject: any;
  vendors = [];
  selectedVendorId = '';
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = '';
  menu = false;
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  constructor(
    private _cabListService: CabListService,
    private _utilityService: UtilityService,
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._cabListService.createFilterObject(this.filterForm);
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
    this.searchVendor();
    this.getCabs();
  }

  createFilterForm() {
    this.filterForm = this._cabListService.getFilterForm();
  }

  getCabs() {
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions, vendorId: this.selectedVendorId };
    this._cabListService.getCabs(data)
      .subscribe(
        response => {
          this.cabs.data = response.data.userList;
          this.total = response.data.totalCount;
        }, err => {
        }
      )
  }

  searchVendor() {
    this.filterForm.controls.vendorId.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      tap(x => {
        if (typeof x === 'string') {
          if (!x.trim()) {
            this.vendors = [];
          } else if (x.trim()) {
            this.vendors = this.vendors.filter(item => item.name.indexOf(x.trim()) >= 0)
          }
        }
      }),
      filter(x => (x && typeof x === 'string' && x.trim() && x.trim().length >= 0)),
      switchMap(data => this._cabListService.searchVendor(data))
    ).subscribe(
      response => {
        this.vendors = response.data;
      }
    )
  }

  selectVendor(event) {
    this.selectedVendorId = event.option.value._id;
    this.filterForm.get('vendorId').setValue(event.option.value.name)
  }

  async uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._cabListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = '';
            this.getCabs();
          }
        },
        err => {

        }
      )
    }
    else {
      this._utilityService.showAlert(invalidFileError('only xls file allowed  '));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = '';
    this.myInputVariable.nativeElement.value = "";
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
    this.selectedVendorId = '';
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

  async changeStatus(status, cabId, isAssigned) {
    try {
      await this._cabListService.changeStatus({ status, cabId }, isAssigned);
      this.getCabs();
    } catch (err) {
    }
  }

  ngAfterViewInit() {

  }
}
