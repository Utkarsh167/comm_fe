import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RoutePanelService } from '../../service/route-panel.service';
import { DataService } from 'src/app/modules/shared/services/route-data.service';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-route-box',
  templateUrl: './group-route-box.component.html',
  styleUrls: ['./group-route-box.component.scss']
})
export class GroupRouteBoxComponent implements OnDestroy, OnInit {

  groupDetails: any;
  edittable = false;
  nameForm: FormGroup;
  // Added shifts - Shivakumar A
  shifts: any;
  @Output() group = new EventEmitter<any>();

  @Output() groupNameChange = new EventEmitter<any>();

  @Input() set groupData(data: any) {
    if (data) {
      this.groupDetails = data;
    }
  }

  @Input() tabInfo;

  constructor(private _routeService: RoutePanelService,
    private data: DataService,
    private _formService: FormService,
    private _formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.createGroupNameForm();
    // call getShifts - Shivakumar A
    this.getShifts();
  }


  createGroupNameForm() {
    this.nameForm = this._formBuilder.group(
      {
        "name": this._formService.getControl('alphaNumeric'),
      }
    )
  }

  getControl(control) {
    return this.nameForm.controls[control];
  }

  changeGroupname(id?: string) {
    // console.log("inside function");
    // console.log(id);
    if (this.nameForm.invalid || this.nameForm.disabled) {
      return;
    }

    let obj = {
      routeId: id,
      routeName: this.nameForm.value.name
    }
    this.groupNameChange.emit(obj)
   
  }

  ngOnDestroy() { }

  editableMode(value) {

    if (value) {  
      this.edittable = !this.edittable;
      this.nameForm.controls.name.setValue(this.groupDetails.routeName);
    }
    else {
      this.edittable = !this.edittable;
    }

  }

  async approveGroup(id) { // For approve the group
    let gid = [];
    gid.push(id);
    let obj = {
      id: gid,
    }
    this.data.changeMessage(obj); //  Send approve group data in to the service

  }

  gotoMap() {
    this.group.emit(this.groupDetails);
  }

  // get shifts and assign shift time to shift name - Shivakumar A
  getShifts() {
    this._routeService.getCompanyShift().subscribe(response => {
          this.shifts = response.data.shiftSlot;
          let data = this.shifts.filter(x => x.shiftName === this.groupDetails.shiftName);
          let shiftAndTime = data[0].shiftName+' ('+data[0].startShift+'-'+data[0].endShift+')';
          this.groupDetails.shiftName = shiftAndTime;
        })
  }
}
