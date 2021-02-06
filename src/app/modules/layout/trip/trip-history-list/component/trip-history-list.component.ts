import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-history-list',
  templateUrl: './trip-history-list.component.html',
  styleUrls: ['./trip-history-list.component.scss']
})
export class TripHistoryListComponent implements OnInit {


  filterObject: any;
  isFilterApplied: boolean = false;
  loginTabChange: any;
  looutTabChange: any;

  constructor() { }

  ngOnInit() {
  }


  tabRefresh(event) {
    this.loginTabChange = false;
    this.looutTabChange = false;

    if (event.index == 0) {
      this.loginTabChange = true;
    }
    else if (event.index == 1) {
      this.looutTabChange = true;
    }
  }
}
