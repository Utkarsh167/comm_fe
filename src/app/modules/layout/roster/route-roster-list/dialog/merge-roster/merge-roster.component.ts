import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouteRosterListService } from '../../service/route-roster-list.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-merge-roster',
  templateUrl: './merge-roster.component.html',
  styleUrls: ['./merge-roster.component.scss']
})
export class MergeRosterComponent implements OnInit {

  editRosterForm: FormGroup;
  vendors: any = [];
  cabs: any = [];
  selectedVendorId: string;
  selectedCabId: string;
  selectedCabName: string;
  cabDriverId: string;
  cabPlaceHolder = "Select Cab";
  route: any;

  constructor(public dialogRef: MatDialogRef<MergeRosterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RoasterListService: RouteRosterListService
  ) {

    this.createForm();
  }

  ngOnInit() {
    console.log(this.data);
    this.getAllVendor();
    this.getMergedRosters();
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
    this.cabs = [];
    this.selectedCabId = "";
    this.selectedVendorId = "";
    this.cabDriverId = "";
    this.selectedVendorId = event;
    this.getCabs(this.selectedVendorId);
  }


  getCabs(id) {
    console.log(id);
    let rosters = [];
    let employees = 0;
    this.data.rosterData.forEach(element => {
      rosters.push(element.roasterBadge);
      employees += element.route.empCount;
    });
    let data = {
      vendorId: id,
      rosters: rosters,
      rosterDate: this.data.fromDate,
      seatingCapacity: employees,
      tripTime: this.route.totalTripTime,
      shiftTime: this.route.shiftTime,
      shiftType: this.route.shiftType

    }
    console.log(data);
    // console.log(employees);
    this._RoasterListService.getCabs(data).subscribe(
      response => {
        console.log(response);
        if (response && response.statusCode == 200 && response.data.length) {
          this.cabs = response.data;
          this.cabPlaceHolder = "Select Cab";
        }
        else {
          this.cabs = [];
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



  addMergedRoster() {
    if (this.editRosterForm.invalid || this.editRosterForm.disabled) {
      return;
    }
    let rostersTodlt = [];
    this.data.rosterData.forEach(element => {
      rostersTodlt.push(element._id);
    });
    let obj = {
      "cabId": this.selectedCabId,
      "route": this.route,
      "rosterDate": this.data.fromDate,
      "rostersTodlt": rostersTodlt
    }
    console.log(obj);
    this.editRosterForm.disable();
    this._RoasterListService.addMergedRosters(obj).subscribe(
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
  getMergedRosters(){
    let rosterData = [];
    this.data.rosterData.forEach(element => {
      rosterData.push(element._id);
    });
    let data = {
      rosterData: rosterData
    }
    console.log(data);
    this._RoasterListService.getMergedRosters(data).subscribe(response=>{
      console.log(response)
      this.route = response.data;
      delete this.route.id;
      delete this.route._id;
    });
  }

}
