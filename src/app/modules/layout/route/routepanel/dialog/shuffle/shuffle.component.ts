import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig  } from '@angular/material';
import { RoutePanelService } from '../../service/route-panel.service';
// imported UtilityService, COMMON_MESSAGES - Shivakumar A
import { UtilityService } from '../../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../../constant/messages';
// imported GENDER_COLOUR, GENDERS - Shivakumar A
import { GENDER_COLOUR, GENDERS } from '../../../../../../constant/app-constant';
import { SortEmployeePipe } from '../../../../../../pipes/sort-employee/sort-employee.pipe';

@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit { 

  title: string = "Users";
  groupsEmployees: string[] = [];
  // Assign groups - Shivakumar A
  group: any;
  // definded variables fro color and value - Shivakumar A
  maleValue: string;
  femaleValue: string;
  otherValue: string;
  maleColor: string;
  femaleColor: string;
  otherColor: string;

  @Output() suffledGroupData = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<ShuffleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _routeService: RoutePanelService, public dialog: MatDialog,
    // Added _utilityService - Shivakumar A
    private _utilityService: UtilityService
  ) {
     // Added color's and value - Shivakumar A
     this.maleColor = GENDER_COLOUR.MALE;
     this.femaleColor = GENDER_COLOUR.FEMALE;
     this.otherColor = GENDER_COLOUR.OTHER;
     this.maleValue = GENDERS[0].value;
     this.femaleValue = GENDERS[1].value;
     this.otherValue = GENDERS[2].value;

  }

  ngOnInit() {
    let filter = new SortEmployeePipe();
    this.groupsEmployees = this.data.employees;

    let sortEmployee = filter.transform(this.groupsEmployees);
    this.groupsEmployees = sortEmployee;
    // Assign data to groups - Shivakumar A
    this.group = this.data;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groupsEmployees, event.previousIndex, event.currentIndex);
  }

  /* 
  *****For suffleing the group ***
  */
  suffleGroup() {
    this.groupsEmployees.map(x => {
      delete x['_id'];
      // remove office & shifttype - Shivakumar A
      delete x['office'];
      delete x['shifttype'];
    })
    let obj = {
      routeId: this.data._id,
      employees: this.groupsEmployees
    }
    this._routeService.swapeEmployees(obj).subscribe(
      response => {
        if (response && response.statusCode == 200) {
          this.dialogRef.close(true);
        }
      }, err => {
      }
    )
  }

  /* 
  *****For Closing the model ***
  */
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  // call service to remove employee - Shivakumar A
 async removeUsersFromGroup(empData) {
  let emp = [];
  emp.push(empData.empId);
  let obj = {
    routeId: this.data._id,
    routeName: this.group.routeBadge,
    employeesToRemove: emp
  }
  this._routeService.removeUsersFromGroup(obj).subscribe(
    response => {
      if (response) {
        var filtered = this.group.employees.filter(function(item) { 
          return item.empId !== empData.empId;  
       });

        this.dialogRef.close(true);
        this.group.employees = filtered;
        this.shuffleDialog(this.group)
      }
    },
    err => {
    }
  );
  }
  // function to show confirmation Dialog Shivakumar A
  async removeConfirmation(empData){
    let data = {
      message: COMMON_MESSAGES.REMOVED.confirm("employee") 
    }
    let success = await this._utilityService.openDialog(data).toPromise();
    if(success){
      this.removeUsersFromGroup(empData);
    }
  }

  // Open Shuffle Dialog - Shivakumar A
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
}
