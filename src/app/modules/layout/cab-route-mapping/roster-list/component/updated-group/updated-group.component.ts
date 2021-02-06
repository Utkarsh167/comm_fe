import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { GroupEmployeeComponent } from 'src/app/modules/shared/components/group-employee/group-employee.component';
import { RosterListServiceService } from '../../service/roster-list-service.service';
import { Pagination } from 'src/app/models/pagination';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import * as _ from 'underscore';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-updated-group',
  templateUrl: './updated-group.component.html',
  styleUrls: ['./updated-group.component.scss']
})
export class UpdatedGroupComponent extends Pagination implements OnInit {

  vendors: any = [];
  cabs: any = [];
  selectedVendorId: string;
  selectedCabId: string;
  selectedCabName: string;
  cabDriverId: string;
  selectedOrders = [];
  selectedGroup: any = [];

  @Input() set newRequestTabChange(data: any) {
    if (data) {
      this.getAllUpdatedRequest();
    }
  }

  displayedColumns: string[] = ['position', 'name', 'groupid', 'startlocation', 'endlocation', 'employee', 'duration', 'type', 'shift', 'shiftTime','action'];
  updatedGroup = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog,
    private _RoasterListService: RosterListServiceService,
    private _uitilityService: UtilityService) {
    super();
  }

  ngOnInit() {
  }

  getAllUpdatedRequest() {
    let data = { ...this.validPageOptions };
    this._RoasterListService.getUpdatedRequest(data)
      .subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.updatedGroup.data = response.data.updatedGroupList;
            this.updatedGroup.data.map(elem=>{
              if (elem.shiftType === 'login'){
                elem['shiftTypeLogin']=true;
              }else {
                elem['shiftTypeLogin']=false;;
              }
              
            });
            this.total = response.data.totalCount;
          }
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
    this.getAllUpdatedRequest();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllUpdatedRequest();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getAllUpdatedRequest();
  }


  async approveRequest(status, userId) {
    let temp = [];
    temp.push(userId);
    let obj = {
      groups: temp
    }
    try {
      let data = await this._RoasterListService.changeStatus({ status, obj });
      if (data) {
        this.getAllUpdatedRequest();
      }
    } catch (err) {
    }
  }
  // employee -view satyam
  openDetailDialog(empData,isLogin): void {
    let obj = {
      employees: empData,
      isLogin: isLogin === 'login'?true:false
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = obj;
    const dialogRef = this.dialog.open(GroupEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }


  /*
   Method For Checkbox
 */

  // masterToggle(event) {
  //   if (event.checked) {
  //     this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.loginGroup.data.forEach(row => {
  //         this.selection.select(row);
  //       });
  //     if (this.selectedOrders.length > 0) {
  //       this.selectedOrders = [];
  //     }
  //     this.selection.selected.forEach(item => {
  //       this.selectedOrders.push(item['_id']);
  //     })
  //   }
  //   else {
  //     this.selection.clear();
  //     this.selectedOrders = [];
  //   }
  // }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.loginGroup.data.length;
  //   return numSelected === numRows;
  // }

  // checkboxLabel(row?: any): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }


  // groupSelect(event, data) { // For selecting the order by check box
  //   let obj;
  //   if (event) {
//     this.selectedOrders.push(data._id);
  //     this.isAllSelected();
  //     this.selection.select(data);
  //     obj = {
  //       'cabId': data.cabId,
  //       'driverId': data.cabDriverId,
  //       'routeId': data._id
  //     }

  //     this.selectedGroup.push(obj);
  //   }
  //   else {
  //     let index = this.selectedOrders.indexOf(data._id);
  //     if (index >= 0) {
  //       this.selection.toggle(data);
  //       this.selectedOrders.splice(index, 1);
  //     }

  //     this.selectedGroup.map((x, gIndex) => {
  //       if (x.routeId == data._id) {
  //         this.selectedGroup.splice(gIndex, 1);
  //       }
  //     })
  //   }
  // }







}

