import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { Pagination } from "src/app/models/pagination";
import { RouteRosterListService } from "../../service/route-roster-list.service";
import { Moment } from "moment";
import * as _moment from "moment";
const moment = _moment;
@Component({
  selector: "app-continue-roster",
  templateUrl: "./continue-roster.component.html",
  styleUrls: ["./continue-roster.component.scss"]
})
export class ContinueRosterComponent extends Pagination implements OnInit {
  rosterForm: FormGroup;
  todayDate: any;

  constructor(
    public dialogRef: MatDialogRef<ContinueRosterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RoasterListService: RouteRosterListService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    let date = moment(this.data).add(1, "days");
    this.todayDate = date["_d"];
  }

  createForm() {
    this.rosterForm = this._RoasterListService.createRosterForm();
  }

  getControl(control) {
    return this.rosterForm.controls[control];
  }

  updateRoster() {
    let data = { ...this.changeDateFormat(this.rosterForm.value) };
    if (this.rosterForm.invalid || this.rosterForm.disabled) {
      return;
    }
    this.rosterForm.disable();
    this._RoasterListService.contiuneRoster(data).subscribe(
      response => {
        if (response) {
          this.dialogRef.close(true);
        }
      },
      err => {
        this.rosterForm.enable();
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
