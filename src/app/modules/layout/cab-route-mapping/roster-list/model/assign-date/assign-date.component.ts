import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RosterListServiceService } from '../../service/roster-list-service.service';
import { FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-assign-date',
  templateUrl: './assign-date.component.html',
  styleUrls: ['./assign-date.component.scss']
})
export class AssignDateComponent extends Pagination implements OnInit {

  cabForm: FormGroup;
  todayDate = new Date();
  // new roster flow - satyam
  validFrom;
  validTill;
  data_roaster: any;
  checkExistingRoasters = false;
  dateConfirmation = false;
  groupString = '';

  constructor(public dialogRef: MatDialogRef<AssignDateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RoasterListService: RosterListServiceService) {
    super();
    this.createForm();
  }

  ngOnInit() {
    // new Roster flow -- satyam
    let data = { ...this.changeDateFormat(this.cabForm.value) };
    this.validFrom = new Date(this.data.validFrom).toLocaleDateString();
    this.validTill = new Date(this.data.validTill).toLocaleDateString();
    data['validTill'] =this.data.validTill;
    data['validFrom'] =this.data.validFrom;
    delete this.data.validFrom;
    delete this.data.validTill;
    data['rosterData'] = this.data;
    data['rosterData'] = this.data;
    this._RoasterListService.checkExistingRoasters(data).subscribe( response =>{
      console.log(response);
      if (response.data.length > 0){
        this.checkExistingRoasters = true;
      }else {
        this.dateConfirmation = true;
      }
      response.data.forEach(element => {
        if (this.groupString.length > 0){
          this.groupString = this.groupString + ', ' + element
        }else {
          this.groupString = element;
        }
      });
    });
    this.data.validFrom = data.validFrom;
    this.data.validTill = data.validTill;
  }

  createForm() {
    this.cabForm = this._RoasterListService.createCabForm();
    // this.cabForm.controls.validTill.setValue(new Date);
  }

  getControl(control) {
    return this.cabForm.controls[control];
  }

  addRoster() {
    let data = { ...this.changeDateFormat(this.cabForm.value) };
    // new roster flow -- satyam
    // if (this.cabForm.invalid || this.cabForm.disabled) {
    //   return;
    // }
    data.validTill =this.data.validTill
    data.validFrom =this.data.validFrom
    delete this.data.validFrom;
    delete this.data.validTill;
    data['rosterData'] = this.data;
    data['rosterData'] = this.data;
    // this.cabForm.disable();
    this._RoasterListService.addRoster(data).subscribe(
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
    this.dialogRef.close();
  }
  // check existing rosters -- satyam
  confirmExistingroasters(){
    this.dateConfirmation = true;
    this.checkExistingRoasters = false;
  }

}
