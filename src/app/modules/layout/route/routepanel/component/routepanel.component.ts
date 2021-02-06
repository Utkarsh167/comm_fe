import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfigurationComponent } from '../dialog/configuration/configuration.component';
import { Pagination } from 'src/app/models/pagination';
import { RoutePanelService } from '../service/route-panel.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { DataService } from 'src/app/modules/shared/services/route-data.service';
import { Subscription } from 'rxjs';
import { ValidateMergeComponent } from '../dialog/validate-merge/validate-merge.component';
import { FormGroup } from '@angular/forms';
import { element } from 'protractor';
// Added SHIFT_TYPE - Shivakumar A
import { SHIFT_TYPE } from '../../../../../constant/app-constant'
@Component({
  selector: 'app-routepanel',
  templateUrl: './routepanel.component.html',
  styleUrls: ['./routepanel.component.scss']
})
export class RoutepanelComponent extends Pagination implements OnDestroy, OnInit {

  allGroups: any[] = [];
  allLogoutGroups: any[] = [];
  groupDetailData: any = {};
  onDetailId: string;
  currentGroup: number = 1;
  centerPoints: any;
  selectedGroup: string[] = [];
  menu = false;
  currentTab: string = "login";
  isSearch: boolean;
  loginTabChange: any;
  looutTabChange: any;
  isGroupFound: boolean = false;
  // Added isGroupFoundCheck, newUserList - Shivakumar A
  isGroupFoundCheck: boolean = false;
  newUserList: any;
  subscription: Subscription;
  totalOccupancy: string;
  mergeError: any;
  shifts: any[] = [];
  allTypesGroup: any[] = [];
  selectedShift: string;
  filterForm: FormGroup;
  totalEmployees = 0;
  searchTotalEmployeeCount = 0;


  constructor(public dialog: MatDialog,
    private _routeService: RoutePanelService,
    private _uitilityService: UtilityService,
    private data: DataService) {
    super();
    this.createForm();
  }


  createForm() {
    this.filterForm = this._routeService.createFilterObject();
  }

  ngOnInit() {
    this.page = 1;
    this.getAllGroups(this.validPageOptions, this.currentTab);
    this.subscription = this.data.currentMessage.subscribe(groupId => { // data service is subscribed when single group is approve
      if (groupId && groupId['id']) {
        this.mergeError = groupId;
        this.selectedGroup = groupId['id'];
      }
      if (this.selectedGroup && this.selectedGroup.length) { // check the length
        if (groupId && !groupId['status'])
          this.approveGroup(groupId['status']); // Call the approve group method
      }

    })
    this.getShifts();
  }


  getShifts() {
    this._routeService.getCompanyShift()
      .subscribe(
        response => {
          this.shifts = response.data.shiftSlot;
        }, err => {

        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // unsubscribe the observable
    this.data.changeMessage([]); // set the blank array in service
  }


  tabRefresh(event) { // This method call when tab change
    this.loginTabChange = false;
    this.looutTabChange = false;
    this.selectedShift = ""; // when chnange the tab then reset the filter
    this.filterForm.controls.shiftName.setValue(null);
    if (event.index == 0) {
      this.currentTab = "login";
      this.page = 1;
      this.isSearch = false; // set the search false
      this.search = "";
      this.loginTabChange = true; // set the login tab value 
      this.getAllGroups(this.validPageOptions, this.currentTab);
    }
    else if (event.index == 1) {
      this.currentTab = "logout";
      this.page = 1;
      this.isSearch = false;
      this.search = "";
      this.looutTabChange = true;
      this.getAllGroups(this.validPageOptions, this.currentTab);
    }
  }

  /*
  *****For getting all the groups***
  */
  getAllGroups(params, shiftType?, pagination = false) {
    let data = { ...params, shiftType: shiftType, shiftName: this.selectedShift };
    this._routeService.getGroups(data)
      .subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.allTypesGroup = response.data.userList; // for showing or hiding the header button and no data found
            this.totalOccupancy = response.data.totalOccupancy; // total accupancy
            // Assign newUserList data - Shivakumar A
             this.newUserList = response.data.newUserList;

            if (this.currentTab == "login") { // if current tab is login
              if (this.isSearch) { // if search is applied then do  all groups array empty
                // Commented this array - Shivakumar A
                // this.allGroups = [];
              }
              if (response && response.data.userList.length) { // for showing the all the header button
                this.isGroupFound = true;
                // if data is available assign isGroupFoundCheck = false
                this.isGroupFoundCheck = false;
              }
              // Added Else statement - Shivakumar A
              else {
                // if data is available assign isGroupFoundCheck = true
                this.isGroupFoundCheck = true;

              }
              if (!pagination) { // if pagination is not apply
                this.allGroups = [...response.data.userList];
              } else {  // if pagination is apply then append the result in exiting array
                this.allGroups = [...this.allGroups, ...response.data.userList]; // for pagination
              }
              if (this.allGroups.length) {
                // Assign searchTotalEmployeeCount to 0
                this.searchTotalEmployeeCount = 0;
                // Add office address to employee - Shivakumar A
                this.allGroups[0].employees.map(x=>{
                  x.office = this.allGroups[0].endLocation;
                  x.shifttype = this.allGroups[0].shiftType;
                });

                this.groupDetailData = this.allGroups[0].employees; // for polygon
                this.onDetailId = this.allGroups[0]._id;
                 // shift type -- satyam
                this.groupDetailData.shiftType = this.allGroups[0].shiftType;
                console.log(this.groupDetailData);

                /* Get Total Employee Count - Shivakumar A */
                this.allGroups.forEach(element => {
                  this.searchTotalEmployeeCount = this.searchTotalEmployeeCount + element.empCount;
                })
              }
              this.selectedGroup = [];
            }

            else if (this.currentTab == "logout") {

              if (this.isSearch) {
                // Commented this array - Shivakumar A
                // this.allLogoutGroups = [];
              }
              if (!pagination) { // if pagination is not apply
                this.allLogoutGroups = [...response.data.userList];
              } else { //  // if pagination is apply then append the result in exiting array
                this.allLogoutGroups = [...this.allLogoutGroups, ...response.data.userList];
              }
              if (this.allLogoutGroups.length) {
                // Assign searchTotalEmployeeCount to 0
                this.searchTotalEmployeeCount = 0;
                 // Add office address to employee - Shivakumar A
                 this.allLogoutGroups[0].employees.map(x=>{
                  x.office = this.allLogoutGroups[0].startLocation;
                  x.shifttype = this.allLogoutGroups[0].shiftType;
                });
                
                this.groupDetailData = this.allLogoutGroups[0].employees; // for polygon
                this.onDetailId = this.allLogoutGroups[0]._id;
                 // shift type -- satyam
                this.groupDetailData.shiftType = this.allLogoutGroups[0].shiftType;
                console.log(this.groupDetailData);

                /* Get Total Employee Count - Shivakumar A */
                this.allGroups.forEach(element => {
                  this.searchTotalEmployeeCount = this.searchTotalEmployeeCount + element.empCount;
                })

              }
              this.selectedGroup = [];
            }
            this.total = response.data.totalCount;
            this.allCheckBox = false;

            /* Total Employee Count - Shivakumar A */
            this.totalEmployees = response.data.totalEmployee;

          }
        }, err => {
        }
      )
  }

  /*
    Method For Pagination
  */

  onScroll(event) {
    let tracker = event.target;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    // if (event.target.scrollTop === limit) {
    // convert float value to int, so we on every screen size we get integer value. Added differenceValue - Shivakumar A
    let differenceValue = limit - parseInt(event.target.scrollTop);
    if (parseInt(event.target.scrollTop) === limit ||  differenceValue === 1) {
      if (this.total > (this.validPageOptions['pageNo'] * this.validPageOptions['limit'])) {
        this.page += 1;
        this.getAllGroups(this.validPageOptions, this.currentTab, true);
      }
    }
  }

  /*
    Method For Searching
  */

  setSearch(event) {
    event ? (this.isSearch = true) : false;
    this.search = event;
    this.resetPages();
    this.getAllGroups(this.validPageOptions, this.currentTab);
  }


  /*
  *** For Open the configuration model ***
  */
  assignConfigurationDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(ConfigurationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllGroups(this.validPageOptions, this.currentTab);
      }
    });
  }

  /*
  Method For getting the group details
*/

  gotoMap(groupData: any, index: number) {
    if (this.onDetailId != groupData._id) {
      this.onDetailId = groupData._id;
      this.groupDetailData = null;
      this.centerPoints = null;
      this.groupDetailData = groupData.employees;
      this.centerPoints = groupData.employees[0].empLocation;
      this.currentGroup = index + 1;
    }
  }

  groupDetails($event) {
     // Add office address to employee - Shivakumar A
     $event.employees.map(x=>{
       if($event.shiftType == SHIFT_TYPE[0].value){
        x.office = $event.endLocation;
       } else {
        x.office = $event.startLocation;
       }
    });
    console.log($event);
    this.groupDetailData = [];  
    this.groupDetailData = $event.employees; // for encoded polyline
    // shift type -- satyam
    this.groupDetailData.shiftType = $event.shiftType;
    console.log(this.groupDetailData);
  }

  /*
  Method For approving the group
*/
  async approveGroup(value) {
    let obj = {
      groups: this.selectedGroup,
    }
    if (value) {
      if (this.currentTab == 'login') {
        obj['approveLogin'] = true;
        obj['approveLogout'] = false;
      }
      else {
        obj['approveLogout'] = true;
        obj['approveLogin'] = false;
      }
    }
    try {
      await this._routeService.approveGroup(obj);
      this.page = 1;
      this.getAllGroups(this.validPageOptions, this.currentTab);
    } catch (err) {
    }
  }

  /*
  Method For select the group with checkbox
*/
  selectGroup(grpId, event) {
    if (event) {
      this.selectedGroup.push(grpId);
    }
    else {
      this.selectedGroup.map((x, index) => {
        if (x === grpId) {
          this.selectedGroup.splice(index, 1);
        }
      })
    }
  }

  /*
  Method For merge the group
*/
  async mergeGroup() {
    if (!this.selectedGroup.length) {
      // route--satyam
      this._uitilityService.showAlert("Please select routes for merge");
    }
    else {
      try {
        var obj;
        obj = {
          timeError: this.mergeError.timeError,
          sizeError: this.mergeError.sizeError,
          data: this.selectedGroup
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px';
        dialogConfig.data = obj;
        dialogConfig.panelClass = 'employeeDialog'
        const dialogRef = this.dialog.open(ValidateMergeComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this._routeService.mergeGroup({ groups: this.selectedGroup }).subscribe(response => {
              if (response && response.statusCode == 200) {
                this.selectedGroup = [];
                this._uitilityService.showAlert(response.message);
                this.page = 1;
                this.getAllGroups(this.validPageOptions, this.currentTab);
              }
              else {
                // remove data from array, if error - Shivakumar A
                this.selectedGroup.splice(0, this.selectedGroup.length)
                this._uitilityService.showAlert(response.message);
                // call getAllGroups function - Shivakumar A
                this.page = 1;
                this.getAllGroups(this.validPageOptions, this.currentTab);
              }
            });
          }
        })
      } catch (err) {
      }
    }
  }

  /*
  Method For dissolve the group
  */
  async dissolveGroup() {
    if (!this.selectedGroup.length) {
      // route--satyam
      this._uitilityService.showAlert("Please select routes for dissolve");
    }
    else {
      try {
        await this._routeService.dissolveGroup({ groups: this.selectedGroup });
        this.selectedGroup = [];
        this.page = 1;
        this.getAllGroups(this.validPageOptions, this.currentTab);
      }
      catch (err) {
      }
    }
  }

  /*
  Method For regenrate the group
  */
  async regenrateGroup() {
    if (!this.selectedGroup.length) {
      // route--satyam
      this._uitilityService.showAlert("Please select routes for regenerate");
    }
    else {
      try {
        await this._routeService.regenrateGroup({ groups: this.selectedGroup });
        this.selectedGroup = [];
        this.page = 1;
        this.getAllGroups(this.validPageOptions, this.currentTab);
      }
      catch (err) {
      }
    }
  }

  /*
  Create new groups
  */
  createNewGroups() {
    this._routeService.createNewGroups().subscribe(
      response => {
        if (response && response.statusCode == 200) {
          this.getAllGroups(this.validPageOptions, this.currentTab);
        }
      },
      err => {
      }
    )
  }

  receiveMessage($event) {
    this.selectedGroup = [];
    this.selectedGroup = $event;
    if ($event.isSingle) {
      this.approveGroup($event.isSingle);
    }

  }

  async onUpdateGroupName(data) {
    await this._routeService.updateRouteName(data);
    this.getAllGroups(this.validPageOptions, this.currentTab);
  }

  shiftFilter(event) {
    this.selectedShift = event;
    this.getAllGroups(this.validPageOptions, this.currentTab);
  }

  afterSuffled(event) { // this method call when employee swaping perform
    this.getAllGroups(this.validPageOptions, this.currentTab);
  }

  more_action() {
    this.menu = !this.menu;
  }

  allCheckBox: boolean = false
  selectAllGroups(event) { // this method call when all select checkbox is checked
    this.selectedGroup = [];
    if (this.currentTab == 'login') {
      if (event) {
        this.allCheckBox = true;
        this.allGroups.map(x => {
          if (x.status != "executed") {
            x['ischecked'] = true;
            this.selectedGroup.push(x._id);
          }
        })
      }
      else {
        this.allCheckBox = false;
        this.selectedGroup = [];
        this.allGroups.map(x => {
          x['ischecked'] = false;
        })
      }
    }
    else if (this.currentTab == 'logout') {
      if (event) {
        this.allCheckBox = true;
        this.allLogoutGroups.map(x => {
          if (x.status != "executed") {
            x['ischecked'] = true;
            this.selectedGroup.push(x._id);
          }
        })
      }
      else {
        this.allCheckBox = false;
        this.selectedGroup = [];
        this.allLogoutGroups.map(x => {
          x['ischecked'] = false;
        })
      }
    }
  }


}
