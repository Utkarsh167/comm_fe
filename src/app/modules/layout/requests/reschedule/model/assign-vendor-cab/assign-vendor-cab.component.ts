import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/pagination';
import { RequestListService } from '../../../requests-list/service/request-list.service';

@Component({
  selector: 'app-assign-vendor-cab',
  templateUrl: './assign-vendor-cab.component.html',
  styleUrls: ['./assign-vendor-cab.component.scss']
})
export class AssignVendorCabComponent extends Pagination implements OnInit {

  cabForm: FormGroup;
  vendors: any = [];
  cabs: any = [];
  selectedVendorId: string;
  selectedCabId: string;
  cabDriverId: string;
  cabPlaceholder: string = "Select Cab";
  // crf change -- satyam
  cabRouteNo;
  rosterId;
  employees

  constructor(public dialogRef: MatDialogRef<AssignVendorCabComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RequestListService: RequestListService) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.getAllVendor();
  }

  createForm() {
    this.cabForm = this._RequestListService.createCabForm();
  }

  getControl(control) {
    return this.cabForm.controls[control];
  }


  getAllVendor() {
    this._RequestListService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    })
  }

  selectVendor(event: string) {
    this.employees = null;
    this.selectedVendorId = event;
    this.getCabs();
  }

  getCabs() {
    let data = {
      vendorId: this.selectedVendorId,
      shiftTime: this.data.shiftTime,
      shiftType: this.data.shiftType,
      // crf change -- satyam
      rosterDate: this.data.rosterDate
      // totalTripTime: this.data.totalTripTime
    };
    console.log(this.data);
    this._RequestListService.getCabsForRoster(data).subscribe(
      response => {
        console.log(response);
        if (response && response.data.length) {
          this.cabPlaceholder = "Select Cab";
          this.cabs = response.data;
        }
        else {
          this.cabPlaceholder = "No Cab Found";
          // bug resolved -- satyam
          this.cabs = [];
        }

      }
    )
  }

  selectCab(event) {
    this.selectedCabId = event.cabId;
    this.cabDriverId = event.driverId;
    // crf - change -- satyam
    this.employees = null;
    this.rosterId = "";
    if (event.rosterId){
      this.rosterId = event.rosterId
    }
    if (event.employees){
      this.employees = event.employees;
    }
  }


  approve() {
    let data = { ...this.cabForm.value };
    if (this.cabForm.invalid || this.cabForm.disabled) {
      return;
    }
    data['rescheduleId'] = this.data.rescheduleId;
    data['cabId'] = this.selectedCabId;
    data['driverId'] = this.cabDriverId;
    // crf - change --- satyam
    if (this.rosterId) {
      data['rosterId'] = this.rosterId;
    }
    // console.log(data);
    // return;
    // delete data.vendorId;
    this.cabForm.disable();
    this._RequestListService.approveRequest(data).subscribe(
      response => {
        if (response) {
          this.dialogRef.close(true);
        }

      }, err => {
        this.cabForm.enable();
      }
    )

  }

  onNoClick(): void {
    // console.log("true");
    this.dialogRef.close();
  }


}
