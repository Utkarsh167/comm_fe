import { Component, OnInit, NgZone } from "@angular/core";
import { EmployeeAddService } from "../service/employee-add.service";
import { FormGroup } from "@angular/forms";
import { GENDERS } from "../../../../../../constant/app-constant";
import { Router, ActivatedRoute } from "@angular/router";
import { EMPLOYEES } from "../../../../../../constant/absolute-routes";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.scss"]
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup;
  genders = GENDERS;
  employeeId: string;
  employeeDetail: any;
  allShifts = [];
  isAddress: boolean = false;
  isUniqueMsg: string;
  constructor(
    private _employeeAddService: EmployeeAddService,
    private _router: Router,
    private _route: ActivatedRoute,
    public zone: NgZone
  ) {
    this.createForm();
  }
  // employeeId bug - satyam
  existingEmployeeId: string;

  ngOnInit() {
    this.getAllShifts();
    this.employeeId = this._route.snapshot.params.employeeId;
    if (this.employeeId) {
      this.getEmployeeDetail();
    } else {
      this.validateMobileNo();
    }
  }

  getEmployeeDetail() {
    this._employeeAddService.getEmployeeDetail(this.employeeId).subscribe(
      response => {
        this.employeeDetail = response.data;
        this.existingEmployeeId = this.employeeDetail.employeeId;
        this.patchValue(this.employeeDetail);
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    );
  }

  /********  Validate emp no is unique or not ********/
  validateMobileNo() {
    this.employeeForm.controls.mobileNo.valueChanges
      .pipe(
        // Chnaged time from 800 to 2000 as it was checking very frequently
        // debounceTime(800),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (res && res.length >= 3) {
          this.checkEmpNoUnique(res);
        }
      });
  }
  /***********  END   ************/

  /***********  For checking emp no is unique or not  ************/
  checkEmpNoUnique(data: string) {
    this._employeeAddService
      .checkEmployeeNoUnique({ mobileNo: data })
      .subscribe(resp => {
        if (resp && resp.statusCode == 200) {
          this.isUniqueMsg = null;
        } else if (resp && resp.statusCode == 400) {
          this.employeeForm.controls["mobileNo"].setErrors({
            incorrect: true
          });
          this.isUniqueMsg = "Mobile Number must be unique";
        }
      });
  }
  /***********  END   ************/

  patchValue(data) {
    let formValue = {
      name: data.name,
      email: data.email,
      mobileNo: data.mobileNo,
      employeeId: data.employeeId,
      gender: data.gender,
      shift: data.shift,
      fullAddress: data.pickup.address?data.pickup.address.fullAddress:'',
      latitude: data.pickup?data.pickup.coordinates[1]:null,
      longitude: data.pickup?data.pickup.coordinates[0]:null,
      city: data.pickup.address?data.pickup.address.city:'',
      state: data.pickup.address?data.pickup.address.state:'',
      roadName: data.pickup.address?data.pickup.address.roadName:'',
      houseNo: data.pickup.address?data.pickup.address.houseNo:'',
      landMark: data.pickup.address?data.pickup.address.landMark:''
    };
    this.employeeForm.patchValue(formValue);
  }
  createForm() {
    this.employeeForm = this._employeeAddService.createEmployeeForm();
  }
  getControl(control) {
    return this.employeeForm.controls[control];
  }

  getAllShifts() {
    this._employeeAddService.getAllShifts().subscribe(
      response => {
        this.allShifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

  /***********  This method call when address select from google autocomplete   ************/
  setAddress(data) {
    if (data) {
      this.zone.run(() => {
        this.employeeForm.patchValue({
          fullAddress: data.formatted_address,
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.locality,
          state: data.admin_area_l1,
          roadName: data.sublocality_level_1
        });
      });
    }
  }
  /***********  END   ************/

  /***********  This method is call when user click outside the google input for validate the error   ************/
  checkLocation() {
    if (!this.employeeForm.controls["fullAddress"].value) {
      this.isAddress = true;
    } else {
      this.isAddress = false;
    }
  }
  /***********  END   ************/

  addEmployee() {
    if (this.employeeForm.invalid || this.employeeForm.disabled) {
      return;
    }
    const data = { ...this.employeeForm.value };
    this.employeeForm.disable();
    if (this.employeeId) {
      data["empId"] = this.employeeId;
    }
    // (data);
    if (this.existingEmployeeId == data.employeeId){
      delete data.employeeId
    }
    console.log(data);
    this._employeeAddService.addEmployee(data).subscribe(
      response => {
        this._router.navigate([EMPLOYEES]);
      },
      err => {
        this.employeeForm.enable();
      }
    );
  }
}
