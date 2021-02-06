import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../../../models/pagination';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DriverArchiveService } from '../service/driver-archive.service';

@Component({
  selector: 'app-driver-archive',
  templateUrl: './driver-archive.component.html',
  styleUrls: ['./driver-archive.component.scss']
})
export class DriverArchiveComponent extends Pagination implements OnInit {

  displayedColumns = ['position', 'image', 'name', 'driverId', 'email', 'mobileNo', 'comment', 'created', 'status'];
  drivers = new MatTableDataSource<Driver.Detail>([]);

  constructor(
    private _driverListService: DriverArchiveService,
  ) {
    super();
  }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    let data = { ...this.validPageOptions, userType: 2, isArchived: true };
    this._driverListService.getDrivers(data)
      .subscribe(
        response => {
          this.drivers.data = response.data.userList;
          this.total = response.data.totalCount;
        }, err => {
        }
      )
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getDrivers();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getDrivers();
  }
}
