import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouteInfoService } from '../../service/route-info.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-cab',
  templateUrl: './assign-cab.component.html',
  styleUrls: ['./assign-cab.component.scss']
})
export class AssignCabComponent implements OnInit {

  editRosterForm: FormGroup;
  vendors: any = [];
  cabs: any = [];
  selectedVendorId: string;
  selectedCabId: string;
  selectedCabName: string;
  cabDriverId: string;
  cabPlaceHolder = "Select Cab";
  route: any;

  constructor(public dialogRef: MatDialogRef<AssignCabComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RouteInfoservice: RouteInfoService
  ) {

    this.createForm();
  }

  ngOnInit() {
    console.log(this.data);
    this.getAllVendor();
    // this.getMergedRosters();
    // new roster flow --satyam 
    this.getNewRoster();
  }


  createForm() {
     this.editRosterForm = this._RouteInfoservice.createEditRosterForm();
  }

  getControl(control) {
    return this.editRosterForm.controls[control];
  }

  getAllVendor() {
    this._RouteInfoservice.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    })
  }
  // new roster -- satyam
  getNewRoster() {
    let e = this.data.employee
    let obj = {
      "empId": e.empId,
      "empLocation": e.empLocation,
      "weekOff": e.weekOff,
      "name": e.name,
      "employeeId": e.employeeId,
      "countryCode": e.countryCode,
      "mobileNo": e.mobileNo,
      "address": e.address,
      "gender": e.gender
    };
    let data = {
      rosterId: this.data.roster.id,
      employee: obj
    }
    console.log(data);
    this._RouteInfoservice.getNewRoster(data).subscribe( response=>{
      this.route = response.data;
      console.log(this.route);
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
    let employees = 1;
    let data = {
      vendorId: id,
      rosters: rosters,
      rosterDate: this.data.roster.rosterDate,
      seatingCapacity: employees,
      tripTime: this.route.totalTripTime,
      shiftTime: this.route.shiftTime,
      shiftType: this.route.shiftType

    }
    console.log(data);
    // console.log(employees);
    this._RouteInfoservice.getCabs(data).subscribe(
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

  addNewRoster(){
    if (this.editRosterForm.invalid || this.editRosterForm.disabled) {
      return;
    }
    let obj = {
      cabId: this.selectedCabId,
      rosterDate: this.data.roster.rosterDate,
      route: this.route

    }
     console.log(obj);
    this.editRosterForm.disable();
    this._RouteInfoservice.addMergedRosters(obj).subscribe(
      response => {
        this.removeEmployee();
      },
      err => {
        this.editRosterForm.enable();
      }
    )
  }
  removeEmployee() {
    let emp = [];
    emp.push(this.data.employee.empId);
    let obj = {
      rosterId: this.data.roster.id,
      routeName: this.data.roster.route.routeName,
      employeesToRemove: emp
    }
    this._RouteInfoservice.addEmployee(obj).subscribe(
      response => {
        if (response) {
          this.dialogRef.close(true);
          
        }
      },
      err => {
      }
    )

  }



  addMergedRoster() {
    // if (this.editRosterForm.invalid || this.editRosterForm.disabled) {
    //   return;
    // }
    // let rostersTodlt = [];
    // this.data.rosterData.forEach(element => {
    //   rostersTodlt.push(element._id);
    // });
    // let obj = {
    //   "cabId": this.selectedCabId,
    //   "route": this.route,
    //   "rosterDate": this.data.fromDate,
    //   "rostersTodlt": rostersTodlt
    // }
    // console.log(obj);
    // this.editRosterForm.disable();
    // this._RoasterListService.addMergedRosters(obj).subscribe(
    //   response => {
    //     this.dialogRef.close(true);
    //   },
    //   err => {
    //     this.editRosterForm.enable();
    //   }
    // )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getCreatedRosters(){
    // let data = {
    //   rosterData: rosterData
    // }
    // console.log(data);
    // this._RoasterListService.getMergedRosters(data).subscribe(response=>{
    //   console.log(response)
    //   this.route = response.data;
    //   delete this.route.id;
    //   delete this.route._id;
    // });
  }

}
