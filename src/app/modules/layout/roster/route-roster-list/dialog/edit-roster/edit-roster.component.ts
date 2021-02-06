import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouteRosterListService } from '../../service/route-roster-list.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-roster',
  templateUrl: './edit-roster.component.html',
  styleUrls: ['./edit-roster.component.scss']
})
export class EditRosterComponent implements OnInit {

  editRosterForm: FormGroup;
  vendors: any = [];
  cabs: any = [];
  selectedVendorId: string;
  selectedCabId: string;
  selectedCabName: string;
  cabDriverId: string;
  cabPlaceHolder = "Select Cab";

  constructor(public dialogRef: MatDialogRef<EditRosterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RoasterListService: RouteRosterListService
  ) {

    this.createForm();
  }

  ngOnInit() {
    console.log(this.data)
    this.getAllVendor();
  }


  createForm() {
    this.editRosterForm = this._RoasterListService.createEditRosterForm();
  }

  getControl(control) {
    return this.editRosterForm.controls[control];
  }

  getAllVendor() {
    this._RoasterListService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    })
  }

  selectVendor(event: string) {
    this.selectedVendorId = event;
    this.getCabs(this.selectedVendorId);
  }


  getCabs(id) {
    let rosters = [];
    rosters.push(this.data.rosterbadge);
    // let data = {
    //   vendorId: id,
    //   shiftTime: this.data.shiftTime,
    //   shiftType: this.data.shiftType,
    //   totalTripTime: this.data.tripTime
    // };
    let data = {
      vendorId: id,
      rosters: rosters,
      rosterDate: this.data.rosterDate,
      seatingCapacity: this.data.employee,
      shiftTime: this.data.shiftTime,
      shiftType: this.data.shiftType,
      tripTime: this.data.tripTime

    }
    console.log(data);
    this._RoasterListService.getCabs(data).subscribe(
      response => {
        if (response && response.statusCode == 200 && response.data.length) {
          this.cabs = response.data;
          this.cabPlaceHolder = "Select Cab";
        }
        else {
          this.cabPlaceHolder = "No Cab Found";
        }
      }
    )
  }

  selectCab(event) {
    this.selectedCabName = event.cabBadge;
    this.selectedCabId = event.cabId;
    this.cabDriverId = event.driverId;
  }



  editRoster() {
    if (this.editRosterForm.invalid || this.editRosterForm.disabled) {
      return;
    }
    let obj = {
      "cabId": this.selectedCabId,
      "rosterId": this.data.rosterId,
      "driverId": this.cabDriverId
    }

    this.editRosterForm.disable();
    this._RoasterListService.editRoster(obj).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      err => {
        this.editRosterForm.enable();
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
