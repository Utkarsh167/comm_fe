(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"+ws/":function(e,t,n){"use strict";n.r(t),t.default='<div class="white_wrapper">\n  <div class="flex_row">\n    <div class="flex_col_sm_3">\n      \x3c!-- Added employee name, cabid, vendor name, driver name - Shivakumar A --\x3e\n      <app-search-filter\n        [placeholder]="\'Search by route name, employee name, cabid, vendor name, driver name\'"\n        (setSearch)="setSearch($event)"\n      >\n      </app-search-filter>\n    </div>\n\n    <div class="flex_col_sm_7">\n      <ul class="btn_wrapper text-right">\n        <li>\n          <app-filter-count\n            [filterCount]="appliedFilterCount"\n          ></app-filter-count>\n        </li>\n        <li>\n          <button\n            mat-raised-button\n            (click)="showFilter = !showFilter"\n            color="primary"\n          >\n            <mat-icon>filter_list</mat-icon> Filter\n          </button>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div class="flex_row">\n    <ul class="breadcrumb">\n      <li>\n        <a href="javascript:void(0)" class="active">Trip History</a>\n      </li>\n    </ul>\n  </div>\n</div>\n<div\n  class="white_wrapper filter_wrapper"\n  [class.filter_wrapper_show]="showFilter"\n>\n  <div class="flex_row">\n    <div class="flex_col_sm_6">\n      <app-date-filter [dateObject]="filterObject.registrationDate">\n      </app-date-filter>\n    </div>\n    <div class="flex_col_sm_3">\n      <h4>\n        &nbsp;\n      </h4>\n      <mat-form-field>\n        <mat-select\n          placeholder="Shift"\n          [formControl]="filterForm.controls.shiftName"\n        >\n          \x3c!-- <mat-option *ngFor="let item of shifts" [value]="item.shiftName">{{ item.shiftName}}</mat-option> --\x3e\n          \x3c!-- changes by satyam -> Includes shift timing --\x3e\n          <mat-option *ngFor="let item of shifts" [value]="item.shiftName"\n            >{{ item.shiftName+\' \'+\'(\'+item.startShift+\' - \'+item.endShift+\')\'}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n\n  <div class="flex_row">\n    <div class="flex_col_sm_10 text-center">\n      <ul class="btn_wrapper">\n        <li>\n          <button\n            filter_btn\n            mat-stroked-button\n            [disabled]="disable()"\n            (click)="resetFilter()"\n          >\n            Reset\n          </button>\n        </li>\n        <li>\n          <button\n            filter_btn\n            mat-raised-button\n            color="primary"\n            [disabled]="disable()"\n            (click)="filter()"\n          >\n            Filter\n          </button>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class="white_wrapper">\n  <table\n    mat-table\n    [dataSource]="loginRoster"\n    matSort\n    (matSortChange)="sortData($event)"\n    class="mat-elevation-z8"\n  >\n    <ng-container matColumnDef="position">\n      <th mat-header-cell *matHeaderCellDef>No.</th>\n      <td mat-cell *matCellDef="let element; let i = index">\n        {{ getSerialNumber(i + 1) }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="vendor">\n      <th mat-header-cell *matHeaderCellDef>Vendor</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.cab?.vendor?.name | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="driver">\n      <th mat-header-cell *matHeaderCellDef>Driver Name</th>\n      <td mat-cell *matCellDef="let element">\n        {{ (element?.cab?.driverMapped)[0]?.name | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="cab">\n      <th mat-header-cell *matHeaderCellDef>Cab ID</th>\n      <td mat-cell *matCellDef="let element">\n        \x3c!-- {{ element?.cab?.cabBadge | checkNull }} --\x3e\n        \x3c!-- Added medical cab icon, change Cab ID - Shivakumar A--\x3e\n        {{ element?.cab?.routeNo | checkNull }}\n        <b class="medical_cab_symbol_option" *ngIf="element?.cab?.type === medicalCabValue">&#43;</b>\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="cabModel">\n      <th mat-header-cell *matHeaderCellDef>Cab Model</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.cab?.cabModel | checkNull }}\n      </td> \n    </ng-container>\n\n    \x3c!-- <ng-container matColumnDef="rosterName">\n      <th mat-header-cell *matHeaderCellDef>Roster Name</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.roasterBadge | checkNull }}\n      </td>\n    </ng-container> --\x3e\n\n    <ng-container matColumnDef="groupName">\n      \x3c!-- <th mat-header-cell *matHeaderCellDef>Group Name</th> --\x3e\n      \x3c!-- Added Route Name - Shivakumar A --\x3e\n      <th mat-header-cell *matHeaderCellDef>Route Name</th>\n      <td mat-cell *matCellDef="let element">\n        \x3c!-- {{ element?.route?.routeBadge | checkNull }} --\x3e\n      \x3c!-- Added Route Name - Shivakumar A --\x3e\n        {{ element?.route?.routeName | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="startlocation">\n      <th mat-header-cell *matHeaderCellDef>Start Location</th>\n      \x3c!-- <td mat-cell *matCellDef="let element" title="{{ element?.route?.startLocation }}">\n        {{ element?.route?.startLocation | checkNull }}\n      </td> --\x3e\n      \x3c!-- startLocation - satyam --\x3e\n      <td mat-cell *matCellDef="let element" title="{{ element?.route?.employees[0].address | checkNull }}">\n        {{ element?.route?.employees[0].address | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="endlocation">\n      <th mat-header-cell *matHeaderCellDef>End Location</th>\n      <td mat-cell *matCellDef="let element" title="{{ element?.route?.endLocation }}">\n        {{ element?.route?.endLocation | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="employee">\n      <th mat-header-cell *matHeaderCellDef>No of Employee</th>\n      <td mat-cell *matCellDef="let element">\n        <span\n          class="view_details td-text-wrap"\n          (click)="openDetailDialog(element?.route?.employees)"\n          >{{ element?.route?.empCount | checkNull }}\n        </span>\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="shiftName">\n      <th mat-header-cell *matHeaderCellDef>Shift Name</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.shiftName | checkNull }}\n      </td>\n    </ng-container>\n\n    \x3c!-- <ng-container matColumnDef="shiftTime">\n      <th mat-header-cell *matHeaderCellDef>Shift Time</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.shiftTime | checkNull }}\n      </td>\n    </ng-container> --\x3e\n\n     \x3c!-- Added MatSort - Shivakumar A --\x3e\n    <ng-container matColumnDef="shiftTime">\n      <th mat-header-cell mat-sort-header *matHeaderCellDef>\n      <span\n        [ngClass]="isFilterApplied && filterForm.value.route?.shiftTime ? \'appliedFilter\' : \'\'">Shift Time</span></th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.shiftTime | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="duration">\n      <th mat-header-cell *matHeaderCellDef>Trip duration</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.totalTripTime | checkNull }}\n        <span *ngIf="element?.route?.totalTripTime">{{ "min" }} </span>\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="validity">\n      <th mat-header-cell *matHeaderCellDef>Validity</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.validFrom | customDate }} {{ "to" }}<br />\n        {{ element?.validTill | customDate }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="created">\n      <th mat-header-cell *matHeaderCellDef>Created On</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.rosterDate | customDate }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="rating">\n      <th mat-header-cell *matHeaderCellDef>Rating</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.avgRating | checkNull }}\n      </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\n    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\n  </table>\n\n  <div class="white_wrapper" *ngIf="total === 0">\n    <h2 class="not-found">No Data Found</h2>\n  </div>\n\n  <div class="white_wrapper" *ngIf="loginRoster.data.length">\n    <mat-paginator\n      [length]="total"\n      [pageIndex]="page - 1"\n      [pageSize]="pageSize"\n      [pageSizeOptions]="pageOptions"\n      (page)="changePage($event)"\n    >\n    </mat-paginator>\n  </div>\n</div>\n'},"3V+5":function(e,t,n){"use strict";var a=n("mrSG"),r=n("CcnG"),l=n("vblm"),i=n("FaG1"),o=function(){function e(){}return e.prototype.transform=function(e,t,n){return e&&e.errors?this.getValidationError(e,t,n):""},e.prototype.getValidationError=function(e,t,n){return this.charMessage=n||"characters",e.hasError("required")?t+" is required":e.hasError("pattern")?function(e,t){return e==i.a.email?"Please enter a valid "+t.toLowerCase():e==i.a.password?Object(l.l)(t)+" can not contain blank spaces":e==i.a.name?Object(l.l)(t)+" can not be blank":e==i.a.phone?Object(l.l)(t)+" must contain only numbers and can not start with 0":e==i.a.onlyNumber?"Only digits are allowed":e==i.a.price?Object(l.l)(t)+" must be numeric":e==i.a.alphaNumeric?Object(l.l)(t)+" can contain only characters and numbers":e==i.a.alphaNumericWithSpace?Object(l.l)(t)+" can contain only characters and numbers":e==i.a.alphabetsWithSpace?Object(l.l)(t)+" can contain only characters and space":e==i.a.noSpace?Object(l.l)(t)+" can't contain space":void 0}(e.errors.pattern.requiredPattern,t):e.hasError("minlength")?Object(l.l)(t)+" must be at least "+e.errors.minlength.requiredLength+" "+this.charMessage+" long":e.hasError("maxlength")?Object(l.l)(t)+" can not be more than "+e.errors.maxlength.requiredLength+" "+this.charMessage+" long":e.hasError("matchPassword")?l.i[t].matchPassword||"":e.hasError("min")?Object(l.l)(t)+" can not be less than "+e.errors.min.min:e.hasError("max")?Object(l.l)(t)+" can not be greater than "+e.errors.max.max:e.hasError("alpha")?" Please enter correct "+Object(l.l)(t):void 0},e=a.__decorate([Object(r.W)({name:"validate",pure:!1}),a.__metadata("design:paramtypes",[])],e)}(),c=n("Ip0R"),s=n("gIcY");n.d(t,"a",(function(){return m}));var m=function(){function e(){}return e=a.__decorate([Object(r.L)({imports:[c.c,s.n],declarations:[o],exports:[o],providers:[]})],e)}()},"84Pc":function(e,t,n){"use strict";n.r(t),t.default='<div class="parentWrapper">\n  <div class="white_wrapper">\n    <mat-tab-group (selectedTabChange)="tabRefresh($event)">\n      <mat-tab label="Login">\n        <app-login-trip [loginTabChange]="loginTabChange"></app-login-trip>\n      </mat-tab>\n      <mat-tab label="Logout">\n        <app-logout-trip [logoutTabChange]="looutTabChange"></app-logout-trip>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n\n</div>'},Cllz:function(e,t,n){"use strict";var a=n("mrSG"),r=n("CcnG"),l=n("Ip0R"),i=function(){function e(){}return e.prototype.ngOnInit=function(){},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object)],e.prototype,"filterCount",void 0),e=a.__decorate([Object(r.n)({selector:"app-filter-count",template:a.__importDefault(n("Kbf1")).default,styles:[a.__importDefault(n("q8mc")).default]}),a.__metadata("design:paramtypes",[])],e)}();n.d(t,"a",(function(){return o}));var o=function(){function e(){}return e=a.__decorate([Object(r.L)({imports:[l.c],declarations:[i],exports:[i]})],e)}()},FaG1:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,password:/^[^\s]+$/,name:/(.|\s)*\S(.|\s)*/,phone:"^[1-9][0-9]*$",price:/(^[0][1-9]+)|([1-9]\d*)+$/,alphaNumeric:"^[a-zA-Z0-9]+$",alphaNumericWithSpace:"^[a-zA-Z0-9 ]+$",alphabetsWithSpace:"^[a-zA-Z ]*$",onlyNumber:"^[0-9]*$",noSpace:/^\S*$/}},GxDq:function(e,t,n){"use strict";n.r(t),t.default='@charset "UTF-8";\n.flex_row {\n  display: -webkit-box;\n  display: flex;\n  margin: 0 -10px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.tab-table {\n  margin: 20px 0 0 0;\n}\n.breadcrumb {\n  width: 100%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/ ";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after {\n  display: none;\n}\n:host ::ng-deep .btn_wrapper li:first-child {\n  margin-top: 0;\n}'},Kbf1:function(e,t,n){"use strict";n.r(t),t.default='<div class="btn filter-count"> <span>{{filterCount}}</span> filter applied</div>\n'},LErT:function(e,t,n){"use strict";n.r(t);var a=n("mrSG"),r=n("CcnG"),l=n("BHnd"),i=n("o3x0"),o=n("RzZf"),c=n("iiAa"),s=n("buKM"),m=n("gIcY"),d=n("FTgb"),p=n("jRgp"),u=function(){function e(e,t,n,a){this._formService=e,this._formBuilder=t,this._http=n,this._utilityService=a}return e.prototype.getFilterForm=function(){return this._formBuilder.group(this._formService.getFilterFormControls(["fromDate","toDate","shiftName"]))},e.prototype.createFilterObject=function(e){return{registrationDate:{label:"Trip Date",fromDate:e.controls.fromDate,toDate:e.controls.toDate}}},e.prototype.getAllRoster=function(e){return this._http.get(p.ab,e)},e.prototype.getCompanyShift=function(){return this._http.get(p.G)},e.ctorParameters=function(){return[{type:s.a},{type:m.d},{type:d.a},{type:c.a}]},e=a.__decorate([Object(r.D)({providedIn:"root"}),a.__metadata("design:paramtypes",[s.a,m.d,d.a,c.a])],e)}(),h=n("qOmC"),f=n("F/us"),g=n("yG5I"),b=function(e){function t(t,n,a){var r=e.call(this)||this;return r.dialog=t,r._RoasterListService=n,r._uitilityService=a,r.appliedFilterCount=0,r.isFilterApplied=!1,r.vendors=[],r.cabs=[],r.shifts=[],r.displayedColumns=["position","vendor","driver","cab","cabModel","groupName","startlocation","endlocation","employee","shiftName","shiftTime","duration","rating"],r.loginRoster=new l.a([]),r.createFilterForm(),r.filterObject=r._RoasterListService.createFilterObject(r.filterForm),r.medicalCabValue=g.a[4].viewValue,r}return a.__extends(t,e),Object.defineProperty(t.prototype,"loginTabChange",{set:function(e){e&&this.getAllLoginRoster()},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){this.getShifts(),this.getAllLoginRoster()},t.prototype.getShifts=function(){var e=this;this._RoasterListService.getCompanyShift().subscribe((function(t){e.shifts=t.data.shiftSlot}),(function(e){}))},t.prototype.createFilterForm=function(){this.filterForm=this._RoasterListService.getFilterForm()},t.prototype.getAllLoginRoster=function(){var e=this,t=a.__assign({},this.changeDateFormat(this.filterForm.value),this.validPageOptions,{shiftType:"login",tripStatus:1});this._RoasterListService.getAllRoster(t).subscribe((function(t){e.loginRoster.data=t.data.rosterList,e.total=t.data.totalCount}),(function(e){}))},t.prototype.sortData=function(e){this.sortOptions=e,this.resetPages(),this.getAllLoginRoster()},t.prototype.changePage=function(e){this.pageOptionsOnChange=e,0!=this.total&&this.getAllLoginRoster()},t.prototype.disable=function(){return!this.filterForm.dirty},t.prototype.setSearch=function(e){this.search=e,this.resetPages(),this.getAllLoginRoster()},t.prototype.resetFilter=function(){this.filterForm.reset(),this.resetPages(),this.getAllLoginRoster(),this.appliedFilterCount=0,this.isFilterApplied=!1},t.prototype.filter=function(){var e=Object.values(this.filterForm.value),t=f.filter(e,(function(e){return null!=e}));this.resetPages(),this.getAllLoginRoster(),this.appliedFilterCount=t.length,this.isFilterApplied=!0},t.prototype.openDetailDialog=function(e){var t={employees:e,isLogin:!0},n=new i.c;n.width="500px",n.data=t,this.dialog.open(h.a,n).afterClosed().subscribe((function(e){}))},t.ctorParameters=function(){return[{type:i.b},{type:u},{type:c.a}]},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object),a.__metadata("design:paramtypes",[Object])],t.prototype,"loginTabChange",null),t=a.__decorate([Object(r.n)({selector:"app-login-trip",template:a.__importDefault(n("+ws/")).default,styles:[a.__importDefault(n("XE/5")).default]}),a.__metadata("design:paramtypes",[i.b,u,c.a])],t)}(o.a),v=function(e){function t(t,n,a){var r=e.call(this)||this;return r.dialog=t,r._RoasterListService=n,r._uitilityService=a,r.appliedFilterCount=0,r.isFilterApplied=!1,r.vendors=[],r.cabs=[],r.shifts=[],r.displayedColumns=["position","vendor","driver","cab","groupName","startlocation","endlocation","employee","shiftName","shiftTime","duration","rating"],r.loginRoster=new l.a([]),r.createFilterForm(),r.filterObject=r._RoasterListService.createFilterObject(r.filterForm),r.medicalCabValue=g.a[4].viewValue,r}return a.__extends(t,e),Object.defineProperty(t.prototype,"logoutTabChange",{set:function(e){e&&this.getAllLogoutRoster()},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){this.getShifts()},t.prototype.createFilterForm=function(){this.filterForm=this._RoasterListService.getFilterForm()},t.prototype.getShifts=function(){var e=this;this._RoasterListService.getCompanyShift().subscribe((function(t){e.shifts=t.data.shiftSlot}),(function(e){}))},t.prototype.getAllLogoutRoster=function(){var e=this,t=a.__assign({},this.changeDateFormat(this.filterForm.value),this.validPageOptions,{shiftType:"logout",tripStatus:1});this._RoasterListService.getAllRoster(t).subscribe((function(t){e.loginRoster.data=t.data.rosterList,e.total=t.data.totalCount}),(function(e){}))},t.prototype.setDateFilter=function(){this.filterForm.patchValue({fromDate:this.filterForm.controls.fromDate.value,toDate:this.filterForm.controls.fromDate.value}),this.getAllLogoutRoster()},t.prototype.sortData=function(e){this.sortOptions=e,this.resetPages(),this.getAllLogoutRoster()},t.prototype.changePage=function(e){this.pageOptionsOnChange=e,0!=this.total&&this.getAllLogoutRoster()},t.prototype.disable=function(){return!this.filterForm.dirty},t.prototype.setSearch=function(e){this.search=e,this.resetPages(),this.getAllLogoutRoster()},t.prototype.resetFilter=function(){this.filterForm.reset(),this.resetPages(),this.getAllLogoutRoster(),this.appliedFilterCount=0,this.isFilterApplied=!1},t.prototype.filter=function(){var e=Object.values(this.filterForm.value),t=f.filter(e,(function(e){return null!=e}));this.resetPages(),this.getAllLogoutRoster(),this.appliedFilterCount=t.length,this.isFilterApplied=!0},t.prototype.openDetailDialog=function(e){var t={employees:e,isLogin:!1},n=new i.c;n.width="500px",n.data=t,this.dialog.open(h.a,n).afterClosed().subscribe((function(e){}))},t.ctorParameters=function(){return[{type:i.b},{type:u},{type:c.a}]},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object),a.__metadata("design:paramtypes",[Object])],t.prototype,"logoutTabChange",null),t=a.__decorate([Object(r.n)({selector:"app-logout-trip",template:a.__importDefault(n("oQi9")).default,styles:[a.__importDefault(n("owHZ")).default]}),a.__metadata("design:paramtypes",[i.b,u,c.a])],t)}(o.a),D=function(){function e(){this.isFilterApplied=!1}return e.prototype.ngOnInit=function(){},e.prototype.tabRefresh=function(e){this.loginTabChange=!1,this.looutTabChange=!1,0==e.index?this.loginTabChange=!0:1==e.index&&(this.looutTabChange=!0)},e=a.__decorate([Object(r.n)({selector:"app-trip-history-list",template:a.__importDefault(n("84Pc")).default,styles:[a.__importDefault(n("GxDq")).default]}),a.__metadata("design:paramtypes",[])],e)}(),_=n("faKS"),C=n("RrX5"),y=n("SMsm"),x=n("UodH"),w=n("jQLj"),S=n("b716"),N=n("4epT"),F=n("mVsa"),k=n("La40"),O=n("Wf4p"),L=n("uGex"),A=n("OkvK"),j=n("Ip0R"),R=n("ZYCi"),T=n("MzSu"),H=n("FpXt"),I=n("9sDP"),P=n("3V+5"),q=n("gdGC"),E=n("Cllz");n.d(t,"TripHistoryListModule",(function(){return z}));var G=[{path:"",component:D}],z=function(){function e(){}return e=a.__decorate([Object(r.L)({declarations:[b,v,D],imports:[j.c,H.a,R.e.forChild(G),T.a,y.a,x.a,C.a,w.a,S.b,l.b,N.a,F.a,k.a,_.a,O.q,L.a,m.n,I.a,P.a,q.a,E.a,A.a],providers:[u]})],e)}()},RrX5:function(e,t,n){"use strict";var a=n("mrSG"),r=n("CcnG"),l=n("Ip0R"),i=function(){function e(){this.maxDate=new Date}return e.prototype.ngOnInit=function(){var e=this;!0===this.dateObject.fromDetails&&(this.maxDate=null),this.minDateSubscriber=this.dateObject.fromDate.valueChanges.subscribe((function(t){t||(e.minDate=null)}))},e.prototype.dateChange=function(e){var t=e.value,n=new Date(t);this.minDate=new Date(n.getFullYear(),n.getMonth(),n.getDate()),this.dateObject.toDate.setValue(null)},e.prototype.setToDate=function(){if(this.dateObject.toDate.value){var e=new Date(this.dateObject.toDate.value);e.setHours(23),e.setMinutes(59),e.setSeconds(59),this.dateObject.toDate.setValue(e)}},e.prototype.ngOnDestroy=function(){this.minDateSubscriber.unsubscribe()},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object)],e.prototype,"dateObject",void 0),e=a.__decorate([Object(r.n)({selector:"app-date-filter",template:a.__importDefault(n("qpK1")).default,styles:[a.__importDefault(n("T1hN")).default]}),a.__metadata("design:paramtypes",[])],e)}(),o=n("Wf4p"),c=n("jQLj"),s=n("seP3"),m=n("b716"),d=n("SMsm"),p=n("gIcY");n.d(t,"a",(function(){return u}));var u=function(){function e(){}return e=a.__decorate([Object(r.L)({declarations:[i],imports:[p.n,l.c,o.n,c.a,s.c,m.b,d.a],exports:[i]})],e)}()},T1hN:function(e,t,n){"use strict";n.r(t),t.default='h4 {\n  font-weight: 500;\n  line-height: 19.5px;\n  font-family: "Segoe UI";\n  color: #091e42;\n}'},"XE/5":function(e,t,n){"use strict";n.r(t),t.default='@charset "UTF-8";\n.flex_row {\n  display: -webkit-box;\n  display: flex;\n  margin: 0 -10px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.tab-table {\n  margin: 20px 0 0 0;\n}\n.breadcrumb {\n  width: 100%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/ ";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after {\n  display: none;\n}\n.medical_cab_symbol_option {\n  font-size: 20px;\n  color: red;\n}'},buKM:function(e,t,n){"use strict";var a=n("mrSG"),r=n("CcnG"),l=n("gIcY"),i=n("FaG1"),o=100,c=8,s=20,m=3,d=100,p=10,u=10,h=3,f=1e3,g=1,b=10,v=2,D=20;n.d(t,"a",(function(){return _}));var _=function(){function e(){this.VALIDATION={name:[l.o.pattern(i.a.alphabetsWithSpace),l.o.minLength(m),l.o.maxLength(d)],profileName:[l.o.pattern(i.a.name),l.o.minLength(m),l.o.maxLength(d)],alphabetic:[l.o.pattern(i.a.alphabetsWithSpace),l.o.minLength(m),l.o.maxLength(d)],alphaNumeric:[l.o.pattern(i.a.alphaNumericWithSpace),l.o.minLength(m),l.o.maxLength(d)],price:[l.o.pattern(i.a.price),l.o.minLength(g),l.o.maxLength(b),l.o.min(0)],seatingCapacity:[l.o.required,l.o.pattern(i.a.phone),l.o.min(v),l.o.max(D)],email:[l.o.pattern(i.a.email),l.o.maxLength(o)],description:[l.o.pattern(i.a.name),l.o.minLength(h),l.o.maxLength(f)],password:[l.o.pattern(i.a.password),l.o.minLength(c),l.o.maxLength(s)],phone:[l.o.required,l.o.pattern(i.a.phone),l.o.minLength(p),l.o.maxLength(u)],crfLimitMonth:[l.o.required,l.o.pattern(i.a.onlyNumber)],cutOff:[],dropdown:[],checkbox:[],address:[l.o.required],longitude:[l.o.required],latitude:[l.o.required],startShift:[l.o.required],endShift:[l.o.required],googleAddress:[l.o.required,l.o.minLength(m),l.o.maxLength(d)],noSpace:[l.o.required,l.o.pattern(i.a.noSpace)]}}return e.prototype.matchPassword=function(e){var t=e.get("password").value,n=e.get("confirmPassword").value;t!==n?e.get("confirmPassword").setErrors({matchPassword:!0}):t===n&&e.get("confirmPassword").errors&&(delete e.get("confirmPassword").errors.matchPassword,0===Object.keys(e.get("confirmPassword").errors).length&&e.get("confirmPassword").setErrors(null))},e.prototype.getControl=function(e,t){void 0===t&&(t=!0);var n=this.VALIDATION[e].slice();return t&&("checkbox"===e?n.splice(0,0,l.o.requiredTrue):n.splice(0,0,l.o.required)),["",l.o.compose(n)]},e.prototype.getFilterFormControls=function(e){for(var t={},n=0,a=e;n<a.length;n++){t[a[n]]=[null]}return t},e=a.__decorate([Object(r.D)({providedIn:"root"}),a.__metadata("design:paramtypes",[])],e)}()},oQi9:function(e,t,n){"use strict";n.r(t),t.default='<div class="white_wrapper">\n  <div class="flex_row">\n    <div class="flex_col_sm_3">\n      \x3c!-- Added employee name, cabid, vendor name, driver name - Shivakumar A --\x3e\n      <app-search-filter\n        [placeholder]="\'Search by route name, employee name, cabid, vendor name, driver name\'"\n        (setSearch)="setSearch($event)"\n      >\n      </app-search-filter>\n    </div>\n\n    <div class="flex_col_sm_7">\n      <ul class="btn_wrapper text-right">\n        <li>\n          <app-filter-count\n            [filterCount]="appliedFilterCount"\n          ></app-filter-count>\n        </li>\n        <li>\n          <button\n            mat-raised-button\n            (click)="showFilter = !showFilter"\n            color="primary"\n          >\n            <mat-icon>filter_list</mat-icon> Filter\n          </button>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div class="flex_row">\n    <ul class="breadcrumb">\n      <li>\n        <a href="javascript:void(0)" class="active">Trip History</a>\n      </li>\n    </ul>\n  </div>\n</div>\n<div\n  class="white_wrapper filter_wrapper"\n  [class.filter_wrapper_show]="showFilter"\n>\n  <div class="flex_row">\n    <div class="flex_col_sm_6">\n      <app-date-filter [dateObject]="filterObject.registrationDate">\n      </app-date-filter>\n    </div>\n    <div class="flex_col_sm_3">\n      <h4>\n        &nbsp;\n      </h4>\n      <mat-form-field>\n        <mat-select\n          placeholder="Shift"\n          [formControl]="filterForm.controls.shiftName"\n        >\n        \x3c!-- <mat-option *ngFor="let item of shifts" [value]="item.shiftName">{{ item.shiftName}}</mat-option> --\x3e\n          \x3c!-- changes by satyam -> Includes shift timing --\x3e\n          <mat-option *ngFor="let item of shifts" [value]="item.shiftName"\n            >{{ item.shiftName+\' \'+\'(\'+item.startShift+\' - \'+item.endShift+\')\'}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div class="flex_row">\n    <div class="flex_col_sm_10 text-center">\n      <ul class="btn_wrapper">\n        <li>\n          <button\n            filter_btn\n            mat-stroked-button\n            [disabled]="disable()"\n            (click)="resetFilter()"\n          >\n            Reset\n          </button>\n        </li>\n        <li>\n          <button\n            filter_btn\n            mat-raised-button\n            color="primary"\n            [disabled]="disable()"\n            (click)="filter()"\n          >\n            Filter\n          </button>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class="white_wrapper">\n  <table\n    mat-table\n    [dataSource]="loginRoster"\n    matSort\n    (matSortChange)="sortData($event)"\n    class="mat-elevation-z8"\n  >\n    <ng-container matColumnDef="position">\n      <th mat-header-cell *matHeaderCellDef>No.</th>\n      <td mat-cell *matCellDef="let element; let i = index">\n        {{ getSerialNumber(i + 1) }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="vendor">\n      <th mat-header-cell *matHeaderCellDef>Vendor</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.cab?.vendor?.name | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="driver">\n      <th mat-header-cell *matHeaderCellDef>Driver Name</th>\n      <td mat-cell *matCellDef="let element">\n        {{ (element?.cab?.driverMapped)[0]?.name | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="cab">\n      <th mat-header-cell *matHeaderCellDef>Cab ID</th>\n      <td mat-cell *matCellDef="let element">\n        \x3c!-- {{ element?.cab?.cabBadge | checkNull }} --\x3e\n        \x3c!-- Added medical cab icon, change Cab ID - Shivakumar A--\x3e\n        {{ element?.cab?.routeNo | checkNull }}\n        <b class="medical_cab_symbol_option" *ngIf="element?.cab?.type === medicalCabValue">&#43;</b>\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="cabModel">\n      <th mat-header-cell *matHeaderCellDef>Cab Model</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.cab?.cabModel | checkNull }}\n      </td>\n    </ng-container>\n\n    \x3c!-- <ng-container matColumnDef="rosterName">\n      <th mat-header-cell *matHeaderCellDef>Roster Name</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.roasterBadge | checkNull }}\n      </td>\n    </ng-container> --\x3e\n\n    <ng-container matColumnDef="groupName">\n      \x3c!-- <th mat-header-cell *matHeaderCellDef>Group Name</th> --\x3e\n      \x3c!-- Added Route Name - Shivakumar A --\x3e\n      <th mat-header-cell *matHeaderCellDef>Route Name</th>\n      <td mat-cell *matCellDef="let element">\n        \x3c!-- {{ element?.route?.routeBadge | checkNull }} --\x3e\n      \x3c!-- Added Route Name - Shivakumar A --\x3e\n        {{ element?.route?.routeName | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="startlocation">\n      <th mat-header-cell *matHeaderCellDef>Start Location</th>\n      <td mat-cell *matCellDef="let element" title="{{ element?.route?.startLocation }}">\n        {{ element?.route?.startLocation | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="endlocation">\n      <th mat-header-cell *matHeaderCellDef>End Location</th>\n      \x3c!-- <td mat-cell *matCellDef="let element" title="{{ element?.route?.endLocation }}">\n        {{ element?.route?.endLocation | checkNull }}\n      </td> --\x3e\n      \x3c!-- startLocation -- satyam --\x3e\n      <td mat-cell *matCellDef="let element" title="{{ element?.route?.employees[element.route.employees.length-1].address | checkNull }}">\n        {{ element?.route?.employees[element.route.employees.length-1].address | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="employee">\n      <th mat-header-cell *matHeaderCellDef>No of Employee</th>\n      <td mat-cell *matCellDef="let element">\n        <span\n          class="view_details td-text-wrap"\n          (click)="openDetailDialog(element?.route?.employees)"\n          >{{ element?.route?.empCount | checkNull }}\n        </span>\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="shiftName">\n      <th mat-header-cell *matHeaderCellDef>Shift Name</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.shiftName | checkNull }}\n      </td>\n    </ng-container>\n\n    \x3c!-- <ng-container matColumnDef="shiftTime">\n      <th mat-header-cell *matHeaderCellDef>Shift Time</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.shiftTime | checkNull }}\n      </td>\n    </ng-container> --\x3e\n    \x3c!-- Added MatSort - Shivakumar A --\x3e\n    <ng-container matColumnDef="shiftTime">\n      <th mat-header-cell mat-sort-header *matHeaderCellDef>\n      <span\n        [ngClass]="isFilterApplied && filterForm.value.route?.shiftTime ? \'appliedFilter\' : \'\'">Shift Time</span></th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.shiftTime | checkNull }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="duration">\n      <th mat-header-cell *matHeaderCellDef>Trip duration</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.route?.totalTripTime | checkNull }} {{ "min" }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="validity">\n      <th mat-header-cell *matHeaderCellDef>Validity</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.validFrom | customDate }} {{ "to" }}<br />\n        {{ element?.validTill | customDate }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="created">\n      <th mat-header-cell *matHeaderCellDef>Created On</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.created | customDate }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef="rating">\n      <th mat-header-cell *matHeaderCellDef>Rating</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element?.avgRating | checkNull }}\n      </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\n    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\n  </table>\n\n  <div class="white_wrapper" *ngIf="total === 0">\n    <h2 class="not-found">No Data Found</h2>\n  </div>\n\n  <div class="white_wrapper" *ngIf="loginRoster.data.length">\n    <mat-paginator\n      [length]="total"\n      [pageIndex]="page - 1"\n      [pageSize]="pageSize"\n      [pageSizeOptions]="pageOptions"\n      (page)="changePage($event)"\n    >\n    </mat-paginator>\n  </div>\n</div>\n'},owHZ:function(e,t,n){"use strict";n.r(t),t.default='@charset "UTF-8";\n.flex_row {\n  display: -webkit-box;\n  display: flex;\n  margin: 0 -10px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.tab-table {\n  margin: 20px 0 0 0;\n}\n.breadcrumb {\n  width: 100%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/ ";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after {\n  display: none;\n}\n.medical_cab_symbol_option {\n  font-size: 20px;\n  color: red;\n}'},q8mc:function(e,t,n){"use strict";n.r(t),t.default=".filter-count {\n  cursor: default;\n  pointer-events: none;\n  color: #636F73;\n  font-size: 13px;\n}"},qpK1:function(e,t,n){"use strict";n.r(t),t.default='<h4>{{dateObject.label}}</h4>\n<div class="flex_row">\n  <div class="flex_col_sm_6">\n    <mat-form-field>\n      <input matInput [matDatepicker]="picker1" [formControl]="dateObject.fromDate" [max]="maxDate" (click)="picker1.open()"\n        (dateChange)="dateChange($event)" placeholder="From Date" readonly>\n      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>\n      <mat-datepicker #picker1></mat-datepicker>\n    </mat-form-field>\n  </div>\n  <div class="flex_col_sm_6">\n    <mat-form-field>\n      <input #toDate matInput [formControl]="dateObject.toDate" (dateChange)="setToDate()" [max]="maxDate" [min]="minDate"\n        [matDatepicker]="picker2" (click)="picker2.open()" placeholder="To Date" readonly>\n      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>\n      <mat-datepicker #picker2></mat-datepicker>\n    </mat-form-field>\n  </div>\n</div>\n'}}]);