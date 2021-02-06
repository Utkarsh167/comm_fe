import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/pagination';
import { RequestListService } from '../../requests-list/service/request-list.service';
// filter -- satyam
import * as _ from "underscore";
import * as moment from "moment-timezone";


@Component({
  selector: 'app-other-requests',
  templateUrl: './other-requests.component.html',
  styleUrls: ['./other-requests.component.scss']
})
export class OtherRequestsComponent extends Pagination implements OnInit {

  @Input() set isOtherTab(data: any) {
    if (data) {
      this.getAllOtherrequest();
    }
  }

  filterForm: FormGroup;
  showFilter: boolean = false;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  filterObject: any;
  otherRequests = new MatTableDataSource<Sos.UserList>([]);
  shifts: any;
  // displayedColumns: string[] = ['position', 'name', 'email', 'contact', 'message', 'action'];
  // Removed Action Coloumn and added createdAt, empId & gender Coloumn - Shivakumar A
  // displayedColumns: string[] = ['position', 'name', 'empId' ,'gender', 'email', 'contact', 'message', 'createdAt'];
  displayedColumns: string[] = ['position', 'name', 'empId' ,'gender', 'email', 'contact', 'userType', 'message', 'createdAt'];


  constructor(private _requestList: RequestListService) {
    super();
    this.createFilterForm();
    this.filterObject = this._requestList.createFilterObject(this.filterForm);
  }

  ngOnInit() {
     // filter satyam
     this.getShifts();
  }

  createFilterForm() {
    this.filterForm = this._requestList.getFilterForm();
  }

  /*
    Method For getting all the SOS request 
  */

  getAllOtherrequest() {
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions };
    this._requestList.getAllOtherRequests(data)
      .subscribe(
        response => {
          this.otherRequests.data = response.data.userList;
          this.total = response.data.totalCount;

        }, err => {
        }
      )
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllOtherrequest();
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAllOtherrequest();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getAllOtherrequest();
  }

  /*
    Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
  }

  /*
      Method For Resetting The Filters
    */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllOtherrequest();
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
    this.getAllOtherrequest();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }


  async changeStatus(status, userId) {
    try {
      let data = await this._requestList.changeOtherRequestStatus({ status, userId });
      if (data) {
        this.getAllOtherrequest();
      }
    } catch (err) {
    }
  }
  // filter
  getShifts() {
    this._requestList.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

}
