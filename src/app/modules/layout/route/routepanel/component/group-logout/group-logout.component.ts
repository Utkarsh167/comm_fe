import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/modules/shared/services/route-data.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ShuffleComponent } from '../../dialog/shuffle/shuffle.component';

@Component({
  selector: 'app-group-logout',
  templateUrl: './group-logout.component.html',
  styleUrls: ['./group-logout.component.scss']
})
export class GroupLogoutComponent implements OnInit {


  @Output() groupDetailsData = new EventEmitter<any>();
  @Output() suffledGroupData = new EventEmitter<any>();
  @Output() groupNameData = new EventEmitter<any>();

  groupDetails: any;
  // Added newUserDetails - Shivakumar A
  newUserDetails: any;
  selectedGroup: any[] = [];
  maxTripConfigurationTime: number = 0;
  groupConfigurationSize: number = 0;
  groupTotalTripTime: number = 0;
  groupTotalSize: number = 0;
  isTimeError: boolean = false;
  isSizeError: boolean = false;
  selectedGroupData: any[] = [];

  @Input() set groupLogoutData(data: any) {
    if (data) {
      this.groupDetails = data;
    }
  }
   // get newUserDetails - Shivakumar A
   @Input() set newUserData(data: any) {
    if (data) {
      this.newUserDetails = data;
    }
  }
  constructor(private data: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  /*
 Method For select the group with checkbox
*/
  selectGroup(grpData, event) {
    // Added Try Catch - Shivakumar A
     try {
    if (event) {
      this.selectedGroup.push(grpData._id);
      this.selectedGroupData.push(grpData);
    }
    else {
      this.selectedGroup.map((x, index) => {
        // if (x._id === grpData._id) {
        // changed x._id to x [x._id was returning undefined] - Shivakumar A
        if (x === grpData._id) {

          this.selectedGroup.splice(index, 1);
          this.selectedGroupData.splice(index, 1);
        }
      })
    }
    this.groupTotalTripTime = 0;
    this.groupTotalSize = 0;
    if (this.selectedGroupData, length) {
      this.maxTripConfigurationTime = this.selectedGroupData[0].maxTripDuration; // get the max trip time from group configuration
      this.groupConfigurationSize = this.selectedGroupData[0].maxGroupSize; // get the max group size from group configuration
      this.selectedGroupData.map(data => {
        if (data) {
          this.groupTotalTripTime = this.groupTotalTripTime + data.totalTripTime; // Calculate the total trip time of every group
          this.groupTotalSize = this.groupTotalSize + data.empCount; // Calculate the total emp count of every group
        }
      })

      if (this.groupTotalTripTime > this.maxTripConfigurationTime) { // check the trip time
        this.isTimeError = true;
      }
      if (this.groupTotalSize > this.groupConfigurationSize) { // check the group size
        this.isSizeError = true;
      }
    }

    let obj = { // make the obj
      id: this.selectedGroup,
      status: true,
      timeError: this.isTimeError, // set the time error
      sizeError: this.isSizeError // set the size error
    }
    this.data.changeMessage(obj);
  } catch(err) {
  }
  }

  reciecveData($event) {
    this.groupDetailsData.emit($event);

  }

  /** For open the suffle model */

  shuffleDialog(groupData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = groupData;
    const dialogRef = this.dialog.open(ShuffleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suffledGroupData.emit(true);
      }
    });
  }

  // selectAllGroups(event) {
  //   this.selectedGroup = [];
  //   if (event) {
  //     this.groupDetails.map(x => {
  //       if (x.status != "executed") {
  //         x['ischecked'] = true;
  //         this.selectedGroup.push(x._id);
  //       }
  //     })
  //   }
  //   else {
  //     this.selectedGroup = [];
  //     this.groupDetails.map(x => {
  //       x['ischecked'] = false;
  //     })
  //   }
  //   let obj = { // make the obj
  //     id: this.selectedGroup,
  //     status: true,
  //   }
  //   this.data.changeMessage(obj);
  // }

  onNameChange(data) {
    this.groupNameData.emit(data)
  }

  currentIndex:any=1;
  changeClass(index){
    this.currentIndex=index+1;
  }
}
