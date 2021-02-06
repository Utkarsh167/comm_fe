import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ContinueRosterComponent } from "../dialog/continue-roster/continue-roster.component";

@Component({
  selector: "app-route-roster-list",
  templateUrl: "./route-roster-list.component.html",
  styleUrls: ["./route-roster-list.component.scss"]
})
export class RouteRosterListComponent implements OnInit {
  filterObject: any;
  isFilterApplied: boolean = false;
  loginTabChange: any;
  looutTabChange: any;
  rosterEndDate: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  tabRefresh(event) {
    this.loginTabChange = false;
    this.looutTabChange = false;

    if (event.index == 0) {
      this.loginTabChange = true;
    } else if (event.index == 1) {
      this.looutTabChange = true;
    }
  }

  openContinueRosterModel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = this.rosterEndDate;
    const dialogRef = this.dialog.open(ContinueRosterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  checkDate(event) {
    if (event) {
      this.rosterEndDate = event;
    }
  }
}
