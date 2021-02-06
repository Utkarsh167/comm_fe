import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CabMappingService } from "../../service/cab-mapping.service";
import { FormGroup } from "@angular/forms";
import {
  distinctUntilChanged,
  filter,
  debounceTime,
  switchMap
} from "rxjs/operators";
import {
  COMMON_MESSAGES,
  ADD_CAB_MESSAGES
} from "../../../../../../constant/messages";
import { SHIFT_TYPE } from "src/app/constant/app-constant";
// imported CAR_TYPE -  Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';

@Component({
  selector: "app-add-mapping",
  templateUrl: "./add-mapping.component.html",
  styleUrls: ["./add-mapping.component.scss"]
})
export class AddMappingComponent implements OnInit {
  shifts = [];
  mappingForm: FormGroup;
  vendors: any = [];
  selectedVendorId: any;
  drivers: any = [];
  selectedDriverId: any;
  cabs: any = [];
  allShifts = [];
  shiftType = SHIFT_TYPE;
  cabPlaceHolder: string = "Select Cab";
  data: any;
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  selected = '';

  constructor(
    private dialogRef: MatDialogRef<AddMappingComponent>,
    private _cabMappingService: CabMappingService,
    @Inject(MAT_DIALOG_DATA) private empdata: any
  ) {
    this.data = empdata;
    this.createForm();
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
    this.searchVendor();
    this.searchDriver();
    if (this.data.isEdit) {
      this.mappingForm.controls.cabId.clearValidators();
      this.getAndSetFormValue();
    }
  }

  // Added assignMedicalCabSymbol - Shivakumar A
  assignMedicalCabSymbol(data) {
    // console.log(data)
    if (data.type === this.medicalCabValue) {
      this.selected = 'medical_cab_symbol';
    } else {
      this.selected = '';
    }
  }

  getAndSetFormValue() {
    this.mappingForm.patchValue({
      driverId: this.data.cabData.driverMapped.name,
      vendorId: this.data.cabData.vendorName,
      cabId: this.data.cabData.routeNo
    });
  }

  getAllShifts() {
    this._cabMappingService.getAllShifts().subscribe(
      response => {
        this.allShifts = response.data.shiftSlot;
      },
      err => { }
    );
  }

  createForm() {
    this.mappingForm = this._cabMappingService.getMappingForm();
  }

  addMapping() {
    if (this.mappingForm.invalid || this.mappingForm.disabled) {
      return;
    }
    if (!this.selectedDriverId) {
      this._cabMappingService.showAlert(ADD_CAB_MESSAGES.selectDriver);
      return;
    }
    let obj = {
      driverId: this.selectedDriverId
    };
    if (this.data.isEdit) {
      obj["mappedType"] = "Update";
      obj["cabId"] = this.data.cabData._id;
    } else {
      obj["mappedType"] = "Assigned";
      // obj["cabId"] = this.mappingForm.value.cabId;
      // get cab id from object - Shivakumar A
      obj["cabId"] = this.mappingForm.value.cabId._id;

    }
    this._cabMappingService.addMapping(obj).subscribe(
      response => {
        this._cabMappingService.showAlert(COMMON_MESSAGES.ADDED("Mapping"));
        this.closePopup(response);
      },
      err => { }
    );
  }

  closePopup(data = null) {
    this.dialogRef.close(data);
  }

  getControl(control: string) {
    return this.mappingForm.controls[control];
  }

  searchVendor() {
    this._cabMappingService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    });
  }

  selectVendor(event) {
    this.getCabs(event.value);
  }

  getCabs(id) {
    let data = {
      vendorId: id
    };
    this._cabMappingService.getFilteredCabs(data).subscribe(response => {
      if (response && response.data.length) {
        this.cabPlaceHolder = "Select Cab";
        this.cabs = response.data;
      } else {
        this.cabs = [];
        this.cabPlaceHolder = "No Cab Found";
      }
    });
  }
  searchDriver() {
    this.mappingForm.controls.driverId.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        filter(
          x => x && typeof x === "string" && x.trim() && x.trim().length >= 3
        ),
        switchMap(data => this._cabMappingService.searchDriver(data))
      )
      .subscribe(response => {
        this.drivers = response.data;
      });
  }

  selectDriver(event) {
    this.selectedDriverId = event.option.value._id;
    this.mappingForm.get("driverId").setValue(event.option.value.name);
  }
}
