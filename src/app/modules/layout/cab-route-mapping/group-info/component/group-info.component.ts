import { GroupComponent } from '../dialog/group/group.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupInfoService } from '../service/group-info.service';
import { ROSTER } from 'src/app/constant/absolute-routes';
// imported SHIFT_TYPE - Shivakumar A
import { SHIFT_TYPE } from '../../../../../constant/app-constant';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit {


  groupId: string;
  group: any;
  groupDetailData: any;
  // startLocation -- satyam
  shiftTypeLogin = false;
  shiftTypeLogout = false;


  constructor(
    private _groupInfoService: GroupInfoService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.groupId = this._route.snapshot.params.id;
    this.getGroupDetail();
  }

  getGroupDetail() {
    this._groupInfoService.getGroupDetail(this.groupId).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([ROSTER]);
        }
        // console.log(response);
        this.groupDetailData = [];
        this.group = response.data;
        // startLocation -- satyam
        this.groupDetailData = response.data.employees;
        if (this.group.shiftType == 'login'){
          this.shiftTypeLogin = true;
          // shift satyam
          this.groupDetailData.shiftType = 'login'
        }else {
          this.shiftTypeLogout = true;
          // shift satyam
          this.groupDetailData.shiftType = 'logout'
        }
        // Added fromAssignCab - Shivakumar A
        // Added office - Shivakumar A
        response.data.employees.map(x => {
          if (this.group.shiftType === SHIFT_TYPE[0].value) {
            x.office = this.group.endLocation;
          } else {
            x.office = this.group.startLocation;
          }
        });
        this.groupDetailData.fromAssignCab = true;
        console.log(this.groupDetailData);
      },
      err => {
        this._router.navigate([ROSTER]);
      }
    )
  }

  removeEmployee(routeData) {
    let emp = [];
    emp.push(routeData.empId);
    let obj = {
      routeId: this.group._id,
      routeName: this.group.routeName,
      employeesToRemove: emp
    }
    this._groupInfoService.addEmployee(obj).subscribe(
      response => {
        if (response) {
          if (this.group.employees.length == 1){
            this._router.navigate(['admin/cab-map/list'])
          }else{
            this.getGroupDetail();
          }
          
        }
      },
      err => {
      }
    )

  }


  openaddgroupemployeeDialog(): void {

    let obj = {
      routeId: this.group._id,
      routeName: this.group.routeName,
      employees: this.group.employees,
      shift: this.group.shiftName
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = obj;
    const dialogRef = this.dialog.open(GroupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getGroupDetail();
    });
  }

}
