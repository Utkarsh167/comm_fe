import { Component, OnInit } from '@angular/core';
import { ShiftAddService } from '../service/shift-add.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SHIFT_DAYS } from 'src/app/constant/app-constant';
import { Pagination } from 'src/app/models/pagination';
import { SHIFT_LISTS } from 'src/app/constant/absolute-routes';
// limiting date - satyam
import * as _moment from "moment";

@Component({
  selector: 'app-shift-add',
  templateUrl: './shift-add.component.html',
  styleUrls: ['./shift-add.component.scss']
})
export class ShiftAddComponent extends Pagination implements OnInit {

  allShifts = [];
  employeeId: string;
  employeeDetail: Employee.Detail;
  shiftForm: FormGroup;
  allWeekends = SHIFT_DAYS
  selectedWeekOff: any[] = [];
  empShift: string;
  todayDate: any;

  constructor(private _shiftAddService: ShiftAddService,
    private _route: ActivatedRoute,
    private _router: Router) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.getAllShifts();
    this.employeeId = this._route.snapshot.params.employeeId;
    this.getEmployeeDetail();
    // limiting date - satyam
    let date = _moment().add(1, "days");
    this.todayDate = date["_d"];
  }

  createForm() {
    this.shiftForm = this._shiftAddService.createEmployeeForm();
  }

  getControl(control) {
    return this.shiftForm.controls[control];
  }

  getAllShifts() {
    this._shiftAddService.getAllCompanyShifts().subscribe(
      response => {
        this.allShifts = response.data.shiftSlot;
      },
      err => {
      }
    )
  }

  getEmployeeDetail() {
    this._shiftAddService.getEmployeeDetail(this.employeeId).subscribe(
      response => {
        this.employeeDetail = response.data;
        this.patchValue(this.employeeDetail);

      }, err => {
      }
    )
  }

  patchValue(data) {
    this.checkShift(data);
    this.selectedWeekOff = data.weekOff;
    this.empShift = data.shift;
    let formValue = {
      "name": data.name,
      "email": data.email,
      "employeeId": data.employeeId,
      "shiftName": data.shift,
    };
    this.shiftForm.patchValue(formValue);
  }

  checkShift(data) {
    this.allWeekends.map(x => {
      data.weekOff.map(day => {
        if (x.value == day) {
          x.checked = true;
        }
      })
    })
  }

  selectShift(event) {
    // this.allShifts.map(x => {
    //   if (x.shiftName == event.value) {
    //     let formValue = {
    //       "shiftName": x.shiftName,
    //       "validFrom": x.startShift,
    //       "validTill": x.endShift
    //     };
    //     this.shiftForm.patchValue(formValue);
    //   }
    // })
  }

  changeWeekOff(event, day) {
    if (event) {
      this.selectedWeekOff.push(day);
    }
    else {
      this.selectedWeekOff.map((x, index) => {
        if (x === day) {
          this.selectedWeekOff.splice(index, 1);
        }
      })
    }
  }

  editShift() {
    if (this.shiftForm.invalid || this.shiftForm.disabled) {
      return;
    }
    const data = { ...this.shiftForm.value };
    delete data.email;
    delete data.name;
    data['weekOff'] = this.selectedWeekOff;
    data.validFrom = data.validFrom.getTime();
    data.validTill = data.validTill.getTime();
    if (data.shiftName == this.empShift) {
      delete data.shiftName;
    }
    this.shiftForm.disable();
    this._shiftAddService.addShift(data).subscribe(
      response => {
        if (response && response.statusCode == 200) {
          this._router.navigate([SHIFT_LISTS]);
        }
      },
      err => {
        this.shiftForm.enable();
      }
    )
  }

}
