(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{Wp5r:function(e,n,t){"use strict";t.r(n);var a=t("mrSG"),o=t("CcnG"),i=t("Ip0R"),r=t("RzZf"),l=t("BHnd"),s=t("FTgb"),c=t("jRgp"),p=function(){function e(e){this._http=e}return e.prototype.getArchivedEmployees=function(e){return this._http.get(c.Pb,e)},e.ctorParameters=function(){return[{type:s.a}]},e=a.__decorate([Object(o.D)({providedIn:"root"}),a.__metadata("design:paramtypes",[s.a])],e)}(),d=function(e){function n(n){var t=e.call(this)||this;return t._archiveService=n,t.displayedColumns=["position","name","empId","email","contactNo","created","shiftName","startTime","endTime","comment","pickupLocation","dropLocation"],t.employees=new l.a([]),t.appliedFilterCount=0,t.isFilterApplied=!1,t.csvFileName="",t.shifts=[],t.menu=!1,t}return a.__extends(n,e),n.prototype.ngOnInit=function(){this.getArchivedEmployees()},n.prototype.getArchivedEmployees=function(){var e=this,n=a.__assign({},this.validPageOptions,{userType:1,isArchived:!0});this._archiveService.getArchivedEmployees(n).subscribe((function(n){e.employees.data=n.data.userList,e.total=n.data.totalCount}),(function(e){}))},n.prototype.sortData=function(e){this.sortOptions=e,this.resetPages(),this.getArchivedEmployees()},n.prototype.changePage=function(e){this.pageOptionsOnChange=e,0!=this.total&&this.getArchivedEmployees()},n.ctorParameters=function(){return[{type:p}]},a.__decorate([Object(o.ob)("upload_csv",{static:!1}),a.__metadata("design:type",o.u)],n.prototype,"myInputVariable",void 0),n=a.__decorate([Object(o.n)({selector:"app-employee-archive",template:a.__importDefault(t("xnKh")).default,styles:[a.__importDefault(t("f69b")).default]}),a.__metadata("design:paramtypes",[p])],n)}(r.a),m=t("ZYCi"),u=t("seP3"),h=t("b716"),b=t("UodH"),f=t("SMsm"),g=t("4epT"),x=t("OkvK"),w=t("mVsa"),v=t("v9Dh"),y=t("uGex"),D=t("9sDP"),C=t("faKS"),k=t("gdGC"),_=t("jLZc");t.d(n,"EmployeeArchiveModule",(function(){return S}));var z=[{path:"",component:d}],N=[u.c,h.b,b.a,l.b,f.a,g.a,x.a,w.a,v.a,y.a],S=function(){function e(){}return e=a.__decorate([Object(o.L)({declarations:[d],imports:[i.c,m.e.forChild(z)].concat(N,[D.a,C.a,k.a,_.a]),providers:[p]})],e)}()},f69b:function(e,n,t){"use strict";t.r(n),n.default='@charset "UTF-8";\n.flex_row {\n  display: -webkit-box;\n  display: flex;\n  margin: 0 -10px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.breadcrumb {\n  width: 100%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/ ";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after {\n  display: none;\n}\n.breadcrumb li:last-child a:before, .breadcrumb li:last-child a:after {\n  display: none;\n}\n.white_wrapper.action {\n  overflow: inherit !important;\n  position: relative;\n}\n.actionmenu {\n  margin-top: 10px;\n  z-index: 9999;\n  border: 1px solid #e0e0e0;\n  position: absolute;\n  background: #fff;\n  top: 30px;\n  right: 0px;\n  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);\n}\n.actionmenu li {\n  margin: 0;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  flex-wrap: wrap;\n  position: relative;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\n.actionmenu li input {\n  width: 100%;\n}\n.csv-product {\n  background: transparent !important;\n  border: 0;\n  box-shadow: none;\n  color: #262c2d !important;\n  width: 100%;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  display: -webkit-box;\n  display: flex;\n  font-family: "Segoe UI";\n  font-size: 13px;\n  position: relative;\n}\n.csv-product .mat-button-wrapper {\n  margin: 0;\n}\n.csv-product button {\n  background: transparent !important;\n  border: 0;\n  box-shadow: none;\n  color: #262c2d !important;\n  border-bottom: 1px solid #e0e0e0;\n  width: 100%;\n  font-family: "Segoe UI";\n  font-size: 13px;\n}\n.csv-product button .material-icons {\n  font-size: 19px;\n}\n.csv-product.upload input {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.uploadcsv {\n  background: transparent;\n  border: 0;\n  box-shadow: none;\n  color: #262c2d;\n  position: relative;\n  border-bottom: 1px solid #e0e0e0;\n}\n.uploadcsv input {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.rowFilterBox {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n}\napp-search-filter {\n  width: 60%;\n}\n.uploadData {\n  text-align: center;\n}\n.uploadData label {\n  font-size: 13px;\n}\n.uploadData img {\n  width: 15px;\n  height: 15px;\n}\n:host ::ng-deep .csv-product .mat-button-wrapper {\n  margin: 0;\n}\n:host ::ng-deep .csv-product button .material-icons {\n  font-size: 19px;\n}\n:host ::ng-deep .csv-product .material-icons {\n  font-size: 19px;\n}\n:host ::ng-deep .searchWrapper {\n  width: 100% !important;\n}\n:host ::ng-deep .btn_wrapper li {\n  padding: 0;\n}\n:host ::ng-deep .btn_wrapper li.action button.mat-raised-button.mat-primary {\n  background-color: transparent;\n  color: #333;\n  border: 1px solid #c0c2c2;\n  box-shadow: 2px 5px 4px -2px inset #b8b8b880;\n}\n:host ::ng-deep .btn_wrapper li .actionmenu li button {\n  transition: all 0.5s ease;\n  -webkit-transition: all 0.5s ease;\n  -moz-transition: all 0.5s ease;\n}\n:host ::ng-deep .btn_wrapper li .actionmenu li button.mat-raised-button.mat-primary {\n  box-shadow: none;\n  border: 0;\n}\n:host ::ng-deep .btn_wrapper li .actionmenu li:hover {\n  background: #e8e8e8 !important;\n}\n:host ::ng-deep .btn_wrapper li .actionmenu li:first-child button.mat-raised-button.mat-primary {\n  border-bottom: 1px solid #e0e0e0;\n}\n:host ::ng-deep .mat-menu-content {\n  height: auto;\n}\nbutton.action_menu {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: pointer;\n  outline: 0;\n  min-width: 64px;\n  line-height: 36px;\n  padding: 0 16px;\n  border-radius: 4px;\n  overflow: visible;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  -webkit-transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: transparent;\n  color: #333;\n  border: 1px solid #c0c2c2;\n  box-shadow: 2px 5px 4px -2px inset #b8b8b880;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\nbutton.action_menu .mat-icon {\n  position: relative;\n  right: 10px;\n}'},xnKh:function(e,n,t){"use strict";t.r(n),n.default='<div class="white_wrapper action">\n  <div class="flex_row">\n    <ul class="breadcrumb">\n      <li>\n        <a href="javascript:void(0)">Stakeholders</a>\n      </li>\n      <li>\n        <a routerLink="/admin/stakeholders/employees">Employee</a>\n      </li>\n      <li>\n        <a href="javascript:void(0)" class="active">Archived</a>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<div class="white_wrapper">\n  <table mat-table [dataSource]="employees" matSort (matSortChange)="sortData($event)" class="mat-elevation-z8">\n\n\n    <ng-container matColumnDef="position">\n      <th mat-header-cell *matHeaderCellDef> No. </th>\n      <td mat-cell *matCellDef="let element;let i=index"> {{getSerialNumber(i+1)}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef="name">\n      <th mat-header-cell mat-sort-header *matHeaderCellDef>Full Name </th>\n      <td mat-cell *matCellDef="let element">{{element.name|checkNull}}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="empId">\n      <th mat-header-cell *matHeaderCellDef> Employee ID </th>\n      <td mat-cell *matCellDef="let element"><span class="td-text-wrap">{{element.employeeId|checkNull}}</span>\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="email">\n      <th mat-header-cell *matHeaderCellDef> Email </th>\n      <td mat-cell *matCellDef="let element"> <span>{{element.email|checkNull}}</span> </td>\n    </ng-container>\n\n\n    <ng-container matColumnDef="contactNo">\n      <th mat-header-cell *matHeaderCellDef> Contact No. </th>\n      <td mat-cell *matCellDef="let element"> {{element.mobileNo|checkNull}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef="created">\n      <th mat-header-cell mat-sort-header *matHeaderCellDef>\n        <span [ngClass]="(isFilterApplied && filterForm.value.fromDate)?\'appliedFilter\':\'\'">Registration Date\n        </span>\n      </th>\n      <td mat-cell *matCellDef="let element">\n        <span matTooltip="Filters applied" matTooltipPosition="below">{{element.created|customDate}}</span>\n      </td>\n\n    </ng-container>\n\n    <ng-container matColumnDef="shiftName">\n      <th mat-header-cell *matHeaderCellDef>Shift Name </th>\n      <td mat-cell *matCellDef="let element">\n        {{element.shift | checkNull}}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="startTime">\n      <th mat-header-cell *matHeaderCellDef>Shift Start Time </th>\n      <td mat-cell *matCellDef="let element">\n        {{element.shiftStartTime | shiftTime}}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="endTime">\n      <th mat-header-cell *matHeaderCellDef>Shift End Time </th>\n      <td mat-cell *matCellDef="let element">\n        {{element.shiftEndTime | shiftTime}}\n      </td>\n    </ng-container>\n\n    \x3c!-- reasonForComment -- satyam --\x3e\n    <ng-container matColumnDef="comment">\n      <th mat-header-cell *matHeaderCellDef>Reason </th>\n      <td mat-cell *matCellDef="let element"><span title="{{element?.comment}}" class="td-text-wrap">\n          {{element?.comment | checkNull}} </span></td>\n    </ng-container>\n\n    <ng-container matColumnDef="pickupLocation">\n      <th mat-header-cell *matHeaderCellDef>Pick Up Location </th>\n      <td mat-cell *matCellDef="let element"><span class="td-text-wrap"\n          title="{{element?.pickup?.address?.fullAddress}}">\n          {{element?.pickup?.address?.fullAddress|checkNull}} </span> </td>\n    </ng-container>\n\n    <ng-container matColumnDef="dropLocation">\n      <th mat-header-cell *matHeaderCellDef>Drop off Location </th>\n      <td mat-cell *matCellDef="let element"><span title="{{element?.dropoff?.address}}" class="td-text-wrap">\n          {{element?.dropoff?.address|checkNull}} </span></td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\n    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\n  </table>\n  <div class="white_wrapper" *ngIf="total===0">\n    <h2 class="not-found">No Data Found</h2>\n  </div>\n  <div class="white_wrapper" *ngIf="employees.data.length">\n    <mat-paginator [length]="total" [pageIndex]="page-1" [pageSize]="pageSize" [pageSizeOptions]="pageOptions"\n      (page)="changePage($event)">\n    </mat-paginator>\n  </div>\n</div>'}}]);