import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-roster-list',
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss']
})
export class RosterListComponent implements OnInit {
  filterObject: any;
  isFilterApplied: boolean = false;
  loginTabChange: any;
  looutTabChange: any;
  newRequestTabChange: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  tabRefresh(event) {
    this.loginTabChange = false;
    this.looutTabChange = false;
    this.newRequestTabChange = false;

    if (event.index == 0) {
      this.loginTabChange = true;
    }
    else if (event.index == 1) {
      this.looutTabChange = true;
    }
    else if (event.index == 2) {
      this.newRequestTabChange = true;
    }
  }


}
