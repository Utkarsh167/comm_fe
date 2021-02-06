import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../../../models/pagination';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CabArchiveService } from '../service/cab-archive.service';
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';

@Component({
  selector: 'app-cab-archive',
  templateUrl: './cab-archive.component.html',
  styleUrls: ['./cab-archive.component.scss']
})
export class CabArchiveComponent extends Pagination implements OnInit {

  displayedColumns = ['position', 'cabBadge', 'cabModel', 'registrationNo', 'seatingCapacity', 'vendorName', 'comment', 'created', 'isAssigned', 'status'];
  cabs = new MatTableDataSource<Cab.Single>([]);
  selectedVendorId = '';
  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;

  constructor(
    private _cabListService: CabArchiveService,
  ) {
    super();
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  ngOnInit() {
    this.getCabs();
  }

  getCabs() {
    let data = { ...this.validPageOptions,isArchived:true };
    this._cabListService.getCabs(data)
      .subscribe(
        response => {
          this.cabs.data = response.data.userList;
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
    this.getCabs();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getCabs();
  }


}
