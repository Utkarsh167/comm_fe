import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { RosterListServiceService } from '../../service/roster-list-service.service';
import { Pagination } from 'src/app/models/pagination';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { AssignDateComponent } from '../../model/assign-date/assign-date.component';
import * as _ from 'underscore';
import { SelectionModel } from '@angular/cdk/collections';
import { GroupEmployeeComponent } from 'src/app/modules/shared/components/group-employee/group-employee.component';
import * as moment from 'moment';

// imported CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../../constant/app-constant';
// satyam -- delete cab mapping component 
import { DeleteCabMappingComponent } from '../../deleteCabMapping/delete-cab-mapping/delete-cab-mapping.component';

@Component({
  selector: 'app-logout-ride',
  templateUrl: './logout-ride.component.html',
  styleUrls: ['./logout-ride.component.scss']
})
export class LogoutRideComponent extends Pagination implements OnInit {


  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  vendors: any = [];
  cabs: any = [];
  selectedVendorId: string;
  selectedCabId: string;
  selectedCabName: string;
  cabDriverId: string;
  selectedOrders = [];
  selectedGroup: any = [];
  slectedVendorAndCab = [];
  filteredResult: any = [];
  filteredCab: any = [];
  shifts: any[] = [];
  cabPlaceholder: string = "Select Cab";

   // Added selectedRow - Shivakumar A
   selectedRow:boolean[]=[];
   // new Roster flow -- satyam
  minDateFrom = new Date();
  minDateTo = new Date();

  @Input() set logoutTabChange(data: any) {
    if (data) {
      this.getAllLogoutRoster();
    }
  }
  // validity column -- satyam
  displayedColumns: string[] = ['check', 'position', 'vendor', 'cab', 'seatingCapacity' ,'name', 'shiftName', 'shiftTime','startlocation', 'endlocation', 'employee', 'validity', 'duration', 'action'];
  logoutGroup = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  // Added medicalCabValue, selected - Shivakumar A
  medicalCabValue: string;
  selected = '';

  constructor(public dialog: MatDialog,
    private _RoasterListService: RosterListServiceService,
    private _uitilityService: UtilityService) {
    super();
    this.createFilterForm();
    this.filterObject = this._RoasterListService.createFilterObject(this.filterForm);
  }

  ngOnInit() { 
    this.getShifts();
    this.getAllVendor();
    // Assign value to medicalCabValue - Shivakumar A
    this.medicalCabValue = CAR_TYPE[4].viewValue;
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    this.filterForm.controls.fromDate.setValue(date);
    this.filterForm.controls.toDate.setValue(date);
  }

  createFilterForm() {
    this.filterForm = this._RoasterListService.getFilterForm();
  }

  getShifts() {
    this._RoasterListService.getCompanyShift()
      .subscribe(
        response => {          
          this.shifts = response.data.shiftSlot;
        }, err => {

        }
      )
  }

  getAllLogoutRoster() {
    // clear row index - Shivakumar A
    this.selectedRow = [];
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions, shiftType: 'logout' };
    this._RoasterListService.getGroupsForAssignCab(data)
      .subscribe(
        response => {
          this.logoutGroup.data = response.data.userList;
          // Added index to map - Shivakumar A
          this.logoutGroup.data.map((x, index)=>{
            if ( x.cab ){
              x['cabPlaceHolder']=x.cab.routeNo;
              x['vendorPlaceHolder']=x.cab.vendor.name;
              // seatingCapacity - satyam
              x['seatingCapacity']=x.cab.seatingCapacity;
              x.validFrom =  new Date(x.validFrom).toLocaleDateString();
              x.validTill =  new Date(x.validTill).toLocaleDateString();
              // If type is medical Cab add Symbol - Shivakumar A
             if(x.cab.type === this.medicalCabValue){
              this.selectedRow[index] = true;
             } else {
              this.selectedRow[index] = false;
             }

            } else {
              x['cabPlaceHolder']="Select Cab";
              x['vendorPlaceHolder']="Select Vendor";
            }
            
          });
          this.total = response.data.totalCount;
        }, err => {
        }
      )
  }

  getAllVendor() {
    this._RoasterListService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    })
  }

  selectVendor(event: string, shiftType: string, shiftTime: string, totalTripTime: string, rideData, index) {
    if (this.slectedVendorAndCab.length) {
      this.slectedVendorAndCab.map((selectedCab, index) => { // check the selected vendor and cab id in slectedVendorAndCab array
        if (rideData.vendorId === selectedCab.vendorId
          && rideData.cabId === selectedCab.cabId) {
          this.slectedVendorAndCab.splice(index, 1);
        }
      })

    }
    this.selectedVendorId = event;
    rideData['vendorId'] = this.selectedVendorId;
    // seatingCapacity - satyam
    rideData['seatingCapacity']='-';
    // Medical symbol issue -- satyam
    this.selectedRow[index]=false;
    this.getCabs(this.selectedVendorId, shiftType, shiftTime, totalTripTime, rideData);
  }

  // satyam code 
  getCabs(id, type, time, tripTime, value) {
    let data = {
      vendorId: id,
      shiftTime: time,
      shiftType: type,
      totalTripTime: tripTime,
      // new Roster flow -- satyam
      routeBadge: value.routeBadge,
     ...this.changeDateFormat(this.filterForm.value)
    };
    // console.log(value);
    this._RoasterListService.getCabsForRoster(data).subscribe(
      response => {
        if (response && response.data.length) {
          value['cabPlaceHolder']="Select Cab";
        }
        else {
          value['cabs']=[];
          value['cabPlaceHolder']="No Cab Found";
          return
        }
        if (this.slectedVendorAndCab.length) { // check the selected vendor cab and vendor array length
          this.filteredResult = [];
          this.filteredCab = [];
          this.slectedVendorAndCab.map(x => { // filter the result on the basis of vendor id
             var currentRoster = moment(time, 'HH:mm')
             var rosterObject = moment(x.shiftTime,'HH:mm');
            if (this.selectedVendorId === x.vendorId) {
              if(time===x.shiftTime){
                this.filteredResult.push(x);
              }else if (currentRoster > rosterObject){
                rosterObject=moment(x.shiftTime,'HH:mm').add(x.tripTime,'minutes');
                if(Math.abs(currentRoster.diff(rosterObject,'minutes'))<120){
                  this.filteredResult.push(x);
                }else{
                  this.filteredCab = response.data;
                }
              }else{
                currentRoster=moment(time, 'HH:mm').add(tripTime,'minutes');
                if(Math.abs(rosterObject.diff(currentRoster,'minutes'))<120){
                  this.filteredResult.push(x);
                }else{
                  this.filteredCab = response.data;
                }
              }
              
              
            }
            else {
              this.filteredCab = response.data;
            }
          })
          if (this.filteredResult.length) {
            this.filteredCab = [];
            response.data.map(cab => { // filter the cab from filtered result array
              var i = 0;
              this.filteredResult.map(result => {
                if (cab.cabId == result.cabId) {
                  i++;
                }
              })
              if ( i==0 ){
                this.filteredCab.push(cab);
              }
              
            })
          }
          if ( this.filteredCab.length ) {
            let finalFilteredCab = [];
            // seating capacity check -- satyam
            this.filteredCab.forEach(element => {
              if (value.empCount <= element.seatingCapacity){
                finalFilteredCab.push(element);
              }
            });
            if (finalFilteredCab.length){
              value['cabs'] = finalFilteredCab; // set the data in array object
              value['cabPlaceHolder']="Select Cab";

            }else {
              value['cabs']=[];
              value['cabPlaceHolder']="No Cab Found";
            }
            
          } else {
            value['cabs']=[];
            value['cabPlaceHolder']="No Cab Found";
          }
         
        }
        else {
          // seating capacity check -- satyam
          let finalFilteredCab = [];
          response.data.forEach(element => {
              if (value.empCount <= element.seatingCapacity){
                finalFilteredCab.push(element);
              }
            });
            if (finalFilteredCab.length){
              value['cabs'] = finalFilteredCab; // set the data in array object
              value['cabPlaceHolder']="Select Cab";

            }else {
              value['cabs']=[];
              value['cabPlaceHolder']="No Cab Found";
            }
        }
      }
    )
  }

  // app-inventive code 
  // getCabs(id, type, time, tripTime, value) {
  //   let data = {
  //     vendorId: id,
  //     shiftTime: time,
  //     shiftType: type,
  //     totalTripTime: tripTime
  //   };
  //   this._RoasterListService.getCabsForRoster(data).subscribe(
  //     response => {
  //       if (response && response.data.length) {
  //         this.cabPlaceholder = "Select Cab";
  //       }
  //       else {
  //         this.cabPlaceholder = "No Cab Found";
  //       }
  //       if (this.slectedVendorAndCab.length) { // check the selected vendor cab and vendor array length
  //         this.filteredResult = [];
  //         this.filteredCab = [];
  //         this.slectedVendorAndCab.map(x => { // filter the result on the basis of vendor id
  //           if (this.selectedVendorId === x.vendorId) {
  //             this.filteredResult.push(x);
  //           }
  //           else {
  //             this.filteredCab = response.data;
  //           }
  //         })

  //         if (this.filteredResult.length) {
  //           this.filteredCab = [];
  //           response.data.map(cab => { // filter the cab from filtered result array
  //             this.filteredResult.map(result => {
  //               if (cab.cabId != result.cabId) {
  //                 this.filteredCab.push(cab);
  //               }
  //             })
  //           })
  //         }
  //         value['cabs'] = this.filteredCab; // set the data in array object
  //       }
  //       else {
  //         value['cabs'] = response.data;
  //       }
  //     }
  //   )
  // }

   // satyam's code
   selectCab(event, groupData, shiftTime, tripTime, index) {
    groupData['cabId'] = event.cabId; // set the cab id
    groupData['cabDriverId'] = event.driverId; // set  the driver id
    // seatingCapacity - satyam
    groupData['seatingCapacity'] = event.seatingCapacity;
  
    // Added class to select - Shivakumar A
    if (event.type === this.medicalCabValue) {
      this.selectedRow[index] =!this.selectedRow[index];
    } else {
      this.selected = '';
      this.selectedRow[index] = false;
    }

    this.selectedCabId = event.cabId;
    this.cabDriverId = event.driverId;
    let obj = { // make the object of selected vendor and cab
      vendorId: this.selectedVendorId,
      cabId: this.selectedCabId,
      shiftTime:shiftTime,
      tripTime:tripTime
    }
    this.slectedVendorAndCab.push(obj); // push the object 
  }
  // app-inventive
  // selectCab(event, groupData) {
  //   groupData['cabId'] = event.cabId; // set the cab id
  //   groupData['cabDriverId'] = event.driverId; // set  the driver id
  //   this.selectedCabId = event.cabId;
  //   this.cabDriverId = event.driverId;
  //   let obj = { // make the object of selected vendor and cab
  //     vendorId: this.selectedVendorId,
  //     cabId: this.selectedCabId
  //   }
  //   this.slectedVendorAndCab.push(obj); // push the object 
  // }


  /*
   Method For Checkbox
 */

  masterToggle(event) {
    let obj;
    if (event.checked) {
      this.isAllSelected() ?
        this.selection.clear() :
        this.logoutGroup.data.forEach(row => {
          if (row.cabId) {
            this.selection.select(row);
            obj = {
              'cabId': row.cabId,
              'driverId': row.cabDriverId,
              'routeId': row._id,
              // New Roster flow -- satyam
              'routeBadge': row.routeBadge
            }
            this.selectedGroup.push(obj);
          }
        });
      if (this.selectedOrders.length > 0) {
        this.selectedOrders = [];
      }
      this.selection.selected.forEach(item => {
        this.selectedOrders.push(item['_id']);
      })
    }
    else {
      this.selection.clear();
      this.selectedOrders = [];
      this.selectedGroup = [];
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.logoutGroup.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  groupSelect(event, data) { // For selecting the order by check box
    let obj;
    if (event) {
      this.selectedOrders.push(data._id);
      this.isAllSelected();
      this.selection.select(data);
      obj = {
        'cabId': data.cabId,
        'driverId': data.cabDriverId,
        'routeId': data._id,
        // new roster flow -- satyam
        'routeBadge': data.routeBadge
      }

      this.selectedGroup.push(obj);
    }
    else {
      let index = this.selectedOrders.indexOf(data._id);
      if (index >= 0) {
        this.selection.toggle(data);
        this.selectedOrders.splice(index, 1);
      }

      this.selectedGroup.map((x, gIndex) => {
        if (x.routeId == data._id) {
          this.selectedGroup.splice(gIndex, 1);
        }
      })
    }
  }

  /*
   Method For Sorting
 */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAllLogoutRoster();

  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllLogoutRoster();
  }

  /*
  Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getAllLogoutRoster();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllLogoutRoster();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }
  /*
    Method For Applying The Filters
  */

  filter() {
    let a = Object.values(this.filterForm.value);
    let b = a.filter(Boolean);
    this.resetPages();
    this.getAllLogoutRoster();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  opencab(groupId: string, flag: boolean): void {

    if (flag) {
      if (!this.selectedGroup.length) {
        this._uitilityService.showAlert("Please select the vendor and cab");
        return;
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      // new roster flow - satyam
      this.selectedGroup['validFrom']=this.filterForm.value.fromDate;
      this.selectedGroup['validTill']=this.filterForm.value.toDate;
      dialogConfig.data = this.selectedGroup;
      const dialogRef = this.dialog.open(AssignDateComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selection.clear();
          this.selectedOrders = [];
          this.selectedGroup = [];
          this.getAllLogoutRoster();
        }
      });
    }

    else {
      if (!this.selectedVendorId || !this.selectedCabId) {
        this._uitilityService.showAlert("Please select the vendor and cab");
        return;
      }
      let obj = {
        cabId: this.selectedCabId,
        driverId: this.cabDriverId,
        routeId: groupId
      }
      let temp = [];
      temp.push(obj);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      dialogConfig.data = temp;
      const dialogRef = this.dialog.open(AssignDateComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selection.clear();
          this.selectedOrders = [];
          this.selectedGroup = [];
          this.slectedVendorAndCab = [];
          this.getAllLogoutRoster();
        }
      });
    }

  }

  openDetailDialog(empData): void {

    let obj = {
      employees: empData,
      isLogin: false
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
  dateChange(value){
    this.minDateTo = this.filterForm.value.fromDate;
    this.filterForm.controls.toDate.setValue(this.filterForm.value.fromDate);
    this.getAllLogoutRoster();
    this.selection.clear();
    this.selectedOrders = [];
    this.selectedGroup = [];
    this.selectedCabId = "";
    this.slectedVendorAndCab = [];
    this.selectedVendorId = "";

  }
  dateChangeTo(value){
    this.getAllLogoutRoster();
    this.selection.clear();
    this.selectedOrders = [];
    this.selectedGroup = [];
    this.selectedCabId = "";
    this.slectedVendorAndCab = [];
    this.selectedVendorId = "";

  }
  // delete cab mapping -- satyam
  deleteCabMapping(element){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      console.log(element);
      let data ={
        routeId: element.routeBadge,
        cabId : element.cab._id,
        fromDate : this.changeDateFormat(this.filterForm.value).fromDate,
        toDate : this.changeDateFormat(this.filterForm.value).toDate
      }
      dialogConfig.data = data;
      const dialogRef = this.dialog.open(DeleteCabMappingComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selection.clear();
          this.selectedOrders = [];
          this.selectedGroup = [];
          this.getAllLogoutRoster();
        }
      });

  }
}
