import { Component, OnInit, ViewChild } from "@angular/core";
import { SocketService } from "src/app/modules/shared/services/socket/socket.service";
import { EMPLOYEES } from "../../../../../../constant/absolute-routes";
import { Router } from "@angular/router";
import { MapTrackingComponent } from "src/app/modules/google-map/component/map-tracking/map-tracking.component";
import { ListService } from "../service/list.service";
import { Pagination } from "src/app/models/pagination";
import { FormGroup } from "@angular/forms";
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent extends Pagination implements OnInit {
  @ViewChild(MapTrackingComponent, { static: true })
  private MapTrackingComponent: MapTrackingComponent;
  mapData: any[] = [];
  cabDetailData: any;
  driverLiveLocation: any;
  filterForm: FormGroup;
  filterObject: any;
  onDetailId: string;
  currentCab: number = 1;
  shadesEl = document.querySelector("body");
  shifts: any;
  // filter-by-shift - satyam
  shiftFilterForm: FormGroup;
  selectedShift: any;

  totalRtlsDataCount = {
    Completed: 0,
    Scheduled: 0,
    Ongoing: 0,
    criticalSos: 0,
    // Added Missed count - Shivakumar A
    Missed: 0
  };

  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  
  constructor(
    private _listService: ListService,
    private _router: Router,
    private _socket: SocketService
  ) {
    super();
     // Assign value to medicalCabValue - Shivakumar A
     this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
    this.createFilterForm();
    // filter-by-shift - satyam
    this.createShiftsFilterForm();
    this.filterObject = this._listService.createFilterObject(this.filterForm);
    this.initSocket();
    // this.getAllCabsList();
    // For Pagination - Shivakumar A
    this.getAllCabsList(false);
    this.getShifts();
    this.shadesEl.classList.add("rtls");
  }
  ngOnDestroy(): void {
    this.shadesEl.classList.remove("rtls");
  }

  /*
   Method For Create the form
 */
  createFilterForm() {
    this.filterForm = this._listService.getFilterForm();
  }
  // filter-by-shift - satyam
  createShiftsFilterForm() {
    this.shiftFilterForm = this._listService.getShiftsFilterForm();
  }



 /*
    Method For Pagination
  */

  // Get new data on scroll - Shivakumar A
 onScroll(event) {
  let tracker = event.target;
  let limit = tracker.scrollHeight - tracker.clientHeight;
  if (event.target.scrollTop === limit) {
    if (this.total > (this.validPageOptions['pageNo'] * this.validPageOptions['limit'])) {
      this.page += 1;
      this.getAllCabsList(this.validPageOptions, true);
    }
  }
}



  /*
  For getting all cabs with pagination - Shivakumar A
  */
 getAllCabsList(params,pagination = false) {
   if(pagination){
    var data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...params
    };
   }else{
    var data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions
    };
   }
  
  this._listService.getAllCabs(data).subscribe(
    response => {
      if (response) {
        this.MapTrackingComponent.markers = {};
        if(pagination){
          this.mapData = [...this.mapData, ...response.data.roster]
        }else{
          this.mapData = response.data.roster;
        }
        this.cabDetailData = this.mapData[0];
        this.totalRtlsDataCount.Ongoing = response.data.totalOngoing;
        this.totalRtlsDataCount.Completed = response.data.totalCompleted;
        this.totalRtlsDataCount.Scheduled = response.data.totalScheduled;
        this.totalRtlsDataCount.criticalSos = response.data.totalCriticalSos; 
        // Added Missed count - Shivakumar A
        this.totalRtlsDataCount.Missed = response.data.totalMissed; 

        if (this.mapData && this.mapData.length) {
          this.onDetailId = this.mapData[0]._id;
          this.getCabLiveLocation(this.cabDetailData._id);
        }
        this.total = response.data.totalCount;
      } else {
        this.mapData = [];
        this.cabDetailData = [];
        this.MapTrackingComponent.markers = {};
      }
    },
    err => {
      this._router.navigate([EMPLOYEES]);
    }
  );
}

// filter-by-shift - satyam
getAllCabsListShift(params,pagination = false) {
  if(pagination){
   var data = {
     ...params,
     shiftName: this.selectedShift
   };
  }else{
   var data = {
    ...params,
    shiftName: this.selectedShift,
     
   };
  }
 
 this._listService.getAllCabs(data).subscribe(
   response => {
     if (response) {
       this.MapTrackingComponent.markers = {};
       if(pagination){
         this.mapData = [...this.mapData, ...response.data.roster]
       }else{
         this.mapData = response.data.roster;
       }
       this.cabDetailData = this.mapData[0];
       this.totalRtlsDataCount.Ongoing = response.data.totalOngoing;
       this.totalRtlsDataCount.Completed = response.data.totalCompleted;
       this.totalRtlsDataCount.Scheduled = response.data.totalScheduled;
       this.totalRtlsDataCount.criticalSos = response.data.totalCriticalSos; 
       if (this.mapData && this.mapData.length) {
         this.onDetailId = this.mapData[0]._id;
         this.getCabLiveLocation(this.cabDetailData._id);
       }
       this.total = response.data.totalCount;
     } else {
       this.mapData = [];
       this.cabDetailData = [];
       this.MapTrackingComponent.markers = {};
     }
   },
   err => {
     this._router.navigate([EMPLOYEES]);
   }
 );
}
  // getAllCabsList() {
  //   let data = {
  //     ...this.changeDateFormat(this.filterForm.value),
  //     ...this.validPageOptions
  //   };
  //   this._listService.getAllCabs(data).subscribe(
  //     response => {
  //       if (response) {
  //         this.MapTrackingComponent.markers = {};
  //         this.mapData = response.data.roster;
  //         this.cabDetailData = this.mapData[0];
  //         this.totalRtlsDataCount.Ongoing = response.data.totalOngoing;
  //         this.totalRtlsDataCount.Completed = response.data.totalCompleted;
  //         this.totalRtlsDataCount.Scheduled = response.data.totalScheduled;
  //         this.totalRtlsDataCount.criticalSos = response.data.totalCriticalSos; 
  //         if (this.mapData && this.mapData.length) {
  //           this.onDetailId = this.mapData[0]._id;
  //           this.getCabLiveLocation(this.cabDetailData._id);
  //         }
  //       } else {
  //         this.mapData = [];
  //         this.cabDetailData = [];
  //         this.MapTrackingComponent.markers = {};
  //       }
  //     },
  //     err => {
  //       this._router.navigate([EMPLOYEES]);
  //     }
  //   );
  // }

  /*
   Method For Socket Connection
 */

  initSocket() {
    this._socket.initialiseSocket();
  }

  /*
  Method For getting the cab live location
*/
  getCabLiveLocation(id) {
    this._socket.getLiveCabLocation(id).subscribe(resp => {
      if (resp) {
        this.driverLiveLocation = null;
        this.driverLiveLocation = resp;
        //console.log(resp);
      }
    });
  }

  /*
   Method For getting the cab details
 */

  gotoDetails(cabData: any, index: number) {
    if (this.onDetailId != cabData._id) {
      this.onDetailId = cabData._id;
      this.MapTrackingComponent.markers = {};
      this.cabDetailData = null;
      this.cabDetailData = cabData;
      this.currentCab = index + 1;
      this.getCabLiveLocation(this.onDetailId);
    }
  }

  /*
   Method For Applying The Filters
 */
  filter() {
    this.resetPages();
    // this.getAllCabsList();
    // For Pagination - Shivakumar A
    this.getAllCabsList(false);

  }

  // filter-by-shift - satyam
  shiftFilter(event) {
    this.selectedShift = event;
    // console.log(this.selectedShift);
    this.resetPages();
    this.getAllCabsListShift(this.validPageOptions,false);
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    // this.getAllCabsList();
    // For Pagination - Shivakumar A
    this.getAllCabsList(false);

    this.currentCab = 1;
  }

  getShifts() {
    this._listService.getCompanyShift()
      .subscribe(
        response => {
          this.shifts = response.data.shiftSlot;
        }, err => {

        }
      )
  }
}
