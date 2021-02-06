import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Pagination } from 'src/app/models/pagination';
import { RequestListService } from '../../requests-list/service/request-list.service';
import { AssignVendorCabComponent } from '../model/assign-vendor-cab/assign-vendor-cab.component';
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../constant/app-constant';
// filter -- satyam
import { FormGroup } from "@angular/forms";
import * as _ from "underscore";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent extends Pagination implements OnInit {

  @Input() set isRescheduledTab(data: any) {
    if (data) {
      this.getRescheduleRequest();
    }
  }

  // displayedColumns: string[] = ['position', 'name', 'empid', 'email', 'contact', 'cabid', 'scheduledfor', 'tripdate', 'rescheduledfor', 'cabtime', 'pickup', 'dropoff', 'cancellreason', 'action'];
  // Added CreatedAt & gender, removed tripdate & cabtime Coloumn = Shivakumar A
  displayedColumns: string[] = ['position', 'name', 'empid', 'gender', 'email', 'cabid', 'rescheduledfor', 'currentShift', 'requestedShift', 'tripType', 'pickup', 'dropoff', 'cancellreason', 'createdAt', 'action'];
  rescheduled = new MatTableDataSource<any>([]);

  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  // filter -- satyam
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  shifts: any;
  // crf date validation -- satyam
  date;

  constructor(private _requestList: RequestListService,
    public dialog: MatDialog) {
    super();
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
    // filter -- satyam
    this.createFilterForm();
    this.filterObject = this._requestList.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    // filter satyam
    this.getShifts();
    // crf date validation -- satyam
    this.date = new moment().startOf('day').format('x');
    console.log(this.date);
  }

  getRescheduleRequest() {
    // filter -- satyam
    // let data = { ...this.validPageOptions, status: 4 };
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      status: 4
    };
    this._requestList.getRescheduleRequests(data)
      .subscribe(
        response => {
          this.rescheduled.data = response.data.rescheduleList;
          console.log(this.rescheduled.data);
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
    this.getRescheduleRequest();

  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getRescheduleRequest();
  }

  openDetailDialog(requestData): void {
    if (!requestData.rosterFound) {
      let obj = {
        shiftTime: requestData.shiftTime,
        shiftType: requestData.shiftType,
        totalTripTime: requestData.roster.route.totalTripTime,
        rescheduleId: requestData._id,
        rosterDate: requestData.scheduleTime
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      dialogConfig.data = obj;
      const dialogRef = this.dialog.open(AssignVendorCabComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Pageno & Limit Data for request - Shivakumar A
          let CancelledData = { ...this.validPageOptions };

          this.getRescheduleRequest();

          // to get all pendingcounts after data changes - Shivakumar A
          this._requestList.getCancelledRequests(CancelledData).subscribe(response => {
            this._requestList.changeMessageData(response.data);
          })
        }
      });
    }
    // commented by - satyam
    // else {
    //   let obj = {
    //     rescheduleId: requestData._id
    //   }
    //   this.changeStatus('approved', obj)
    // }
  }

  async changeStatus(status, obj) {
    try {


      let data = await this._requestList.approveRescheduleRequest({ status, obj });
      if (data) {
        this.getRescheduleRequest();
      }
    } catch (err) {
    }
  }

  async cancel(status, data) {
    let obj = {
      rescheduleId: data._id
    }
    try {
      let data = await this._requestList.approveRescheduleRequest({ status, obj });
      if (data) {
        this.getRescheduleRequest();
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
    this.getRescheduleRequest();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getRescheduleRequest();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }
  /*
    Method For Applying The Filters
  */

  filter() {
    let a = Object.values(this.filterForm.value);
    let b = _.filter(a, function (num) {
      return num != null;
    });
    // let b = a.filter(Boolean);
    this.resetPages();
    this.getRescheduleRequest();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }
  getShifts() {
    this._requestList.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => { }
    );
  }
}
