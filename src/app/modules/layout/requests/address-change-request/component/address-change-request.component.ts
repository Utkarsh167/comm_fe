import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RequestListService } from '../../requests-list/service/request-list.service';
import { Pagination } from 'src/app/models/pagination';
// filter -- satyam
import { FormGroup } from "@angular/forms";
import * as _ from "underscore";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-address-change-request',
  templateUrl: './address-change-request.component.html',
  styleUrls: ['./address-change-request.component.scss']
})
export class AddressChangeRequestComponent extends Pagination implements OnInit {

  @Input() set isAddressTab(data: any) {
    if (data) {
      this.getAddressRequest();
    }
  }
  // displayedColumns: string[] = ['position', 'name', 'empId', 'email', 'contact', 'shiftName', 'pickup', 'requestLOcation', 'action'];
  // Added created & gender Coloumn - Shivakumar A
  displayedColumns: string[] = ['position', 'name', 'empId', "gender", 'email', 'contact', 'shiftName', 'pickup', 'requestLOcation', 'createdAt', 'action'];
  newAddressRequest = new MatTableDataSource<any>([]);
    // filter -- satyam
    filterForm: FormGroup;
    filterObject: any;
    appliedFilterCount: number = 0;
    isFilterApplied: boolean = false;
    shifts: any;

  constructor(private _requestList: RequestListService) {
    super();
    this.createFilterForm();
    this.filterObject = this._requestList.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    // filter -- satyam
    this.getShifts();
  }

  getAddressRequest() {
    // filter -- satyam
    // let data = { ...this.validPageOptions, userType: 1, isAddressChangeReq: true };
    let data = {  ...this.changeDateFormat(this.filterForm.value),...this.validPageOptions, userType: 1, isAddressChangeReq: true };
    this._requestList.getUpdatedAddressRequest(data)
      .subscribe(
        response => {
          this.newAddressRequest.data = response.data.userList;
          // reuestedLocation -- satyam
          this.newAddressRequest.data.forEach( item=>{
            let fullAddress = "";
						if (item.tempPickup.address.houseNo){
							fullAddress = fullAddress.concat(item.tempPickup.address.houseNo);
						}
						if (item.tempPickup.address.roadName){
							if (fullAddress.length !== 0){
								fullAddress = fullAddress.concat(',');
							}
							fullAddress = fullAddress.concat(item.tempPickup.address.roadName);
						}
						if (item.tempPickup.address.city){
							if (fullAddress.length !== 0){
								fullAddress = fullAddress.concat(',');
							}
							fullAddress = fullAddress.concat(item.tempPickup.address.city);
						}
						if (item.tempPickup.address.state){
							if (fullAddress.length !== 0){
								fullAddress = fullAddress.concat(',');
							}
							fullAddress = fullAddress.concat(item.tempPickup.address.state);
						}
						if (item.tempPickup.address.landMark){
							if (fullAddress.length !== 0){
								fullAddress = fullAddress.concat(',');
							}
							fullAddress = fullAddress.concat(item.tempPickup.address.landMark);
						}
						item.tempPickup.address.fullAddress = fullAddress;
          });
          this.total = response.data.totalCount;
        }, err => {

        }
      )
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAddressRequest();

  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAddressRequest();
  }

  async changeStatus(status, userId) {

    let obj = {
      actionType: status,
      empId: userId
    }
    try {
      // Pageno & Limit Data for request - Shivakumar A
      let CancelledData = { ...this.validPageOptions };

      let data = await this._requestList.changeStatus(obj);
      if (data) {
        this.getAddressRequest();

        // to get all pendingcounts after data changes - Shivakumar A
        this._requestList.getCancelledRequests(CancelledData).subscribe(response => {
          this._requestList.changeMessageData(response.data);
        })
      }
    } catch (err) {
    }
  }
  // filter - satyam
  createFilterForm() {
    this.filterForm = this._requestList.getFilterForm();
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
    this.getAddressRequest();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAddressRequest();
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
    this.getAddressRequest();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }
  getShifts() {
    this._requestList.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

}
