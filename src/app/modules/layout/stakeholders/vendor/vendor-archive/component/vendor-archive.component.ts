import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../../../models/pagination';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { VendorArchiveService } from '../service/vendor-archive.service';

@Component({
  selector: 'app-vendor-archive',
  templateUrl: './vendor-archive.component.html',
  styleUrls: ['./vendor-archive.component.scss']
})
export class VendorArchiveComponent extends Pagination implements OnInit {
  // AddedComment reasonForArchive -- satyam
  displayedColumns = ['position', 'image', 'name', 'vendorId', 'email', 'contactNo', 'comment','created', 'cabs', 'status'];
  vendors = new MatTableDataSource<Vendor.Detail>([]);

  constructor(
    private _vendorListService: VendorArchiveService,
  ) {
    super();
  }

  ngOnInit() {
    this.getArchivedVendors();
  }

  getArchivedVendors() {
    let data = { ...this.validPageOptions, isArchived: true };
    this._vendorListService.getVendors(data)
      .subscribe(
        response => {
          this.vendors.data = response.data.userList;
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
    this.getArchivedVendors();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getArchivedVendors();
  }
}
