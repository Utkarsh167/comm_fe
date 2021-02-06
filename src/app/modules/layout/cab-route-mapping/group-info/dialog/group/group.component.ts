import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Pagination } from 'src/app/models/pagination';
import { GroupInfoService } from '../../service/group-info.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends Pagination implements OnInit, OnDestroy {

  employeeData: any;
  search = '';
  lastSearch = '';
  selectedEmpId: string;

  constructor(public dialogRef: MatDialogRef<GroupComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _groupInfoService: GroupInfoService,
    private _uitilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    super();
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmationDialog(): void {
    this.selectedEmpId = null;
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }


  getEmployees() {
    let employeesIds = []
    this.data.employees.map( elem => {
      employeesIds.push(elem.empId)
    });
    // satyam - emp-for-group
    let data = { empId: this.search, employeesIds:employeesIds, shift:this.data.shift };
    // console.log(data);
    this._groupInfoService.getEmployeesForGroup(data)
      .subscribe(
        response => {
          if(response.statusCode === 400){
            this._uitilityService.showAlert("Employee can't be added, please add a different employee");
          }else {
            // console.log(response);
            this.employeeData = null;
            this.employeeData = response.data;
            this.selectedEmpId = this.employeeData._id;
          }
        }, err => {

        }
      )
  }

  // selectEmp() {
  //   this.selectedEmpId = this.employeeData._id;

  // }

  addEmployee() {
    if (!this.selectedEmpId) {
      this._uitilityService.showAlert("Please select the employee");
      return;
    }
    let emp = [];
    emp.push(this.employeeData._id);
    let obj = {
      routeId: this.data.routeId,
      routeName: this.data.routeName,
      employeesToAdd: emp,
    }
    this._groupInfoService.addEmployee(obj).subscribe(
      response => {
        if (response) {
          this.dialogRef.close("true");
          // this.router.navigate(['admin/cab-map/group-info/'+this.data.routeId])
          
        }
      },
      err => {
      }
    )

  }

  /*
    Method For Searching
  */

  searchResult() {
    if (this.search.trim() || this.lastSearch) {
      this.lastSearch = this.search;
      this.getEmployees();
    }
  }

  resetSearch() {
    this.search = '';
    this.lastSearch = '';
    this.employeeData = null;
    this.searchKey = null;
    this.selectedEmpId = null;
  }

}
