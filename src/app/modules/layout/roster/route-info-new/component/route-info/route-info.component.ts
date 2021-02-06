import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteInfoService } from 'src/app/modules/layout/roster/route-info-new/service/route-info.service';
import { ROSTER } from 'src/app/constant/absolute-routes';
import { SHIFT_TYPE } from '../../../../../../constant/app-constant';
import { GroupComponent } from '../../dialog/group/group.component';
import { AssignCabComponent} from '../../dialog/assign-cab/assign-cab.component'

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss']
})
export class RouteInfoComponent implements OnInit {

  groupId: string;
  group: any;
  roster: any;
  groupDetailData: any;
  // startLocation -- satyam
  shiftTypeLogin = false;
  shiftTypeLogout = false;
  rosterId;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _routeinfoService: RouteInfoService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this._route.snapshot.params.id);
    this.rosterId = this._route.snapshot.params.id;
    this.getRosterDetail();
    
  }

  getRosterDetail(){
    let data = {
      rosterId: this._route.snapshot.params.id
    }
    this._routeinfoService.getRosterDetail(data).subscribe(response=>{
      console.log(response);
      this.group = response.data.route;
      this.groupDetailData = response.data.route.employees;
      this.roster = response.data;
      if (this.group.shiftType == 'login'){
          this.shiftTypeLogin = true;
          // shift satyam
          this.groupDetailData.shiftType = 'login'
      }else {
          this.shiftTypeLogout = true;
          // shift satyam
          this.groupDetailData.shiftType = 'logout'
      }
      this.groupDetailData.map(x => {
                if (this.group.shiftType === SHIFT_TYPE[0].value) {
                  x.office = this.group.endLocation;
                } else {
                  x.office = this.group.startLocation;
                }
              });
      this.groupDetailData.fromAssignCab = true;
    })
  }

  // getGroupDetail() {
  //   this._groupInfoService.getGroupDetail(this.groupId).subscribe(
  //     response => {
  //       if (!response.data) {
  //         this._router.navigate([ROSTER]);
  //       }
  //       console.log(response);
  //       this.groupDetailData = [];
  //       this.group = response.data;
  //       // startLocation -- satyam
  //       this.groupDetailData = response.data.employees;
  //       if (this.group.shiftType == 'login'){
  //         this.shiftTypeLogin = true;
  //       }else {
  //         this.shiftTypeLogout = true;
  //       }
  //       // Added fromAssignCab - Shivakumar A
  //       // Added office - Shivakumar A
  //       response.data.employees.map(x => {
  //         if (this.group.shiftType === SHIFT_TYPE[0].value) {
  //           x.office = this.group.endLocation;
  //         } else {
  //           x.office = this.group.startLocation;
  //         }
  //       });
  //       this.groupDetailData.fromAssignCab = true;
  //     },
  //     err => {
  //       this._router.navigate([ROSTER]);
  //     }
  //   )
  // }

  removeEmployee(routeData) {
    let emp = [];
    emp.push(routeData.empId);
    let obj = {
      rosterId: this.rosterId,
      routeName: this.group.routeName,
      employeesToRemove: emp
    }
    this._routeinfoService.addEmployee(obj).subscribe(
      response => {
        if (response) {
          if (this.group.employees.length == 1){
            this._router.navigate(['admin/roster/list'])
          }else{
            this.getRosterDetail();
          }
          
        }
      },
      err => {
      }
    )

  }


  openaddgroupemployeeDialog(): void {

    let obj = {
      rosterId: this.roster._id,
      routeId: this.group._id,
      routeName: this.group.routeName,
      employees: this.group.employees,
      shift: this.group.shiftName,
      data: this.roster
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = obj;
    const dialogRef = this.dialog.open(GroupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.getRosterDetail();
    });
  }
  removeEmployeeWithRoster (emp){
    let data = {
      employee: emp,
      roster: this.roster
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(AssignCabComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.getRosterDetail();
    });
  }

}
