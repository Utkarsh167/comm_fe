(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{CR5G:function(t,e,n){"use strict";n.r(e);var a=n("mrSG"),r=n("CcnG"),i=n("Ip0R"),o=n("BHnd"),l=n("RzZf"),s=n("gIcY"),c=n("buKM"),p=n("FTgb"),d=n("iiAa"),u=n("jRgp"),m=n("vblm"),f=function(){function t(t,e,n,a){this._formService=t,this._formBuilder=e,this._http=n,this._uitilityService=a}return t.prototype.createFilterObject=function(t){return{registrationDate:{label:"Registration Date",fromDate:t.controls.fromDate,toDate:t.controls.toDate},status:{label:"Status",list:[{viewValue:"Active",value:"unblocked"},{viewValue:"Blocked",value:"blocked"}],control:t.controls.status}}},t.prototype.getFilterForm=function(){return this._formBuilder.group(this._formService.getFilterFormControls(["fromDate","toDate","status"]))},t.prototype.getAllSubadmin=function(t){return this._http.get(u.Ib,t)},t.prototype.changeStatus=function(t){return a.__awaiter(this,void 0,void 0,(function(){var e,n,r,i,o,l;return a.__generator(this,(function(a){switch(a.label){case 0:return a.trys.push([0,8,,9]),e=t.status.toUpperCase(),n={message:m.d[e].confirm("Sub Admin"),showTextBox:"DELETED"===e},[4,this._uitilityService.openDialog(n).toPromise()];case 1:return(r=a.sent())?"DELETED"!==e?[3,3]:[4,this._http.post(u.O+t.userId,{comment:r.note}).toPromise()]:[3,6];case 2:return o=a.sent(),[3,5];case 3:return[4,this._http.post(u.o+t.userId,{status:t.status}).toPromise()];case 4:o=a.sent(),a.label=5;case 5:return i=o,this._uitilityService.showAlert(m.d[e].success("Sub Admin")),[2,Promise.resolve(i)];case 6:return[2,Promise.resolve(null)];case 7:return[3,9];case 8:return l=a.sent(),[2,Promise.reject(l)];case 9:return[2]}}))}))},t.ctorParameters=function(){return[{type:c.a},{type:s.d},{type:p.a},{type:d.a}]},t=a.__decorate([Object(r.D)({providedIn:"root"}),a.__metadata("design:paramtypes",[c.a,s.d,p.a,d.a])],t)}(),h=n("F/us"),b=function(t){function e(e){var n=t.call(this)||this;return n._subAdminList=e,n.showFilter=!1,n.appliedFilterCount=0,n.isFilterApplied=!1,n.subAdmins=new o.a([]),n.displayedColumns=["position","name","email","registeredon","roles","status","action"],n.createFilterForm(),n.filterObject=n._subAdminList.createFilterObject(n.filterForm),n}return a.__extends(e,t),e.prototype.ngOnInit=function(){this.getAllSubadmins()},e.prototype.createFilterForm=function(){this.filterForm=this._subAdminList.getFilterForm()},e.prototype.getAllSubadmins=function(){var t=this,e=a.__assign({},this.changeDateFormat(this.filterForm.value),this.validPageOptions);this._subAdminList.getAllSubadmin(e).subscribe((function(e){t.subAdmins.data=e.data.subAdminList,t.total=e.data.totalRecord}),(function(t){}))},e.prototype.changePage=function(t){this.pageOptionsOnChange=t,0!=this.total&&this.getAllSubadmins()},e.prototype.sortData=function(t){this.sortOptions=t,this.resetPages(),this.getAllSubadmins()},e.prototype.setSearch=function(t){this.search=t,this.resetPages(),this.getAllSubadmins()},e.prototype.disable=function(){return!this.filterForm.dirty},e.prototype.resetFilter=function(){this.filterForm.reset(),this.resetPages(),this.getAllSubadmins(),this.appliedFilterCount=0,this.isFilterApplied=!1},e.prototype.filter=function(){var t=Object.values(this.filterForm.value),e=h.filter(t,(function(t){return null!=t}));this.resetPages(),this.getAllSubadmins(),this.appliedFilterCount=e.length,this.isFilterApplied=!0},e.prototype.changeStatus=function(t,e){return a.__awaiter(this,void 0,void 0,(function(){return a.__generator(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this._subAdminList.changeStatus({status:t,userId:e})];case 1:return n.sent()&&this.getAllSubadmins(),[3,3];case 2:return n.sent(),[3,3];case 3:return[2]}}))}))},e.ctorParameters=function(){return[{type:f}]},e=a.__decorate([Object(r.n)({selector:"app-sub-admin-list",template:a.__importDefault(n("y3mR")).default,styles:[a.__importDefault(n("Ik4D")).default]}),a.__metadata("design:paramtypes",[f])],e)}(l.a),g=n("ZYCi"),_=n("b716"),v=n("SMsm"),x=n("v9Dh"),w=n("4epT"),D=n("OkvK"),y=n("jQLj"),S=n("Wf4p"),k=n("mVsa"),C=n("uGex"),A=n("FpXt"),F=n("gdGC"),O=n("MzSu"),j=n("CaoY"),I=n("RrX5"),L=n("Cllz"),P=n("9sDP");n.d(e,"SubAdminListModule",(function(){return R}));var N=[{path:"",component:b}],R=function(){function t(){}return t=a.__decorate([Object(r.L)({imports:[i.c,g.e.forChild(N),A.a,_.b,o.b,v.a,x.a,w.a,D.a,y.a,S.n,k.a,C.a,s.n,j.a,I.a,L.a,F.a,O.a,P.a],declarations:[b],providers:[f]})],t)}()},CaoY:function(t,e,n){"use strict";var a=n("mrSG"),r=n("CcnG"),i=n("Ip0R"),o=function(){function t(){}return t.prototype.ngOnInit=function(){},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object)],t.prototype,"dropdown",void 0),t=a.__decorate([Object(r.n)({selector:"app-dropdown-filter",template:a.__importDefault(n("c5r+")).default,styles:[a.__importDefault(n("utZl")).default]}),a.__metadata("design:paramtypes",[])],t)}(),l=n("seP3"),s=n("uGex"),c=n("Wf4p"),p=n("gIcY");n.d(e,"a",(function(){return d}));var d=function(){function t(){}return t=a.__decorate([Object(r.L)({declarations:[o],imports:[i.c,l.c,s.a,c.q,p.n],exports:[o]})],t)}()},Cllz:function(t,e,n){"use strict";var a=n("mrSG"),r=n("CcnG"),i=n("Ip0R"),o=function(){function t(){}return t.prototype.ngOnInit=function(){},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object)],t.prototype,"filterCount",void 0),t=a.__decorate([Object(r.n)({selector:"app-filter-count",template:a.__importDefault(n("Kbf1")).default,styles:[a.__importDefault(n("q8mc")).default]}),a.__metadata("design:paramtypes",[])],t)}();n.d(e,"a",(function(){return l}));var l=function(){function t(){}return t=a.__decorate([Object(r.L)({imports:[i.c],declarations:[o],exports:[o]})],t)}()},FaG1:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,password:/^[^\s]+$/,name:/(.|\s)*\S(.|\s)*/,phone:"^[1-9][0-9]*$",price:/(^[0][1-9]+)|([1-9]\d*)+$/,alphaNumeric:"^[a-zA-Z0-9]+$",alphaNumericWithSpace:"^[a-zA-Z0-9 ]+$",alphabetsWithSpace:"^[a-zA-Z ]*$",onlyNumber:"^[0-9]*$",noSpace:/^\S*$/}},Ik4D:function(t,e,n){"use strict";n.r(e),e.default='@charset "UTF-8";\n.breadcrumb {\n  width: 18%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/ ";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after {\n  display: none;\n}\n.btn_wrapper li:first-child {\n  margin-top: 0;\n}\n.filter-count {\n  cursor: default;\n  pointer-events: none;\n  color: #636F73;\n  font-size: 13px;\n  position: relative;\n  top: 13px;\n}\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  min-width: 100px;\n  width: 100px;\n}\n.archieveData li {\n  margin-left: 10px;\n}\n.archieveData li a {\n  font-size: 14px;\n  font-weight: 400;\n  text-decoration: underline;\n  color: #006CB8;\n  font-family: "Segoe UI";\n  white-space: nowrap;\n  cursor: pointer;\n}\n.rowFilterBox {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n}\napp-search-filter {\n  width: 60%;\n}\n:host ::ng-deep .searchWrapper {\n  width: 100% !important;\n}'},Kbf1:function(t,e,n){"use strict";n.r(e),e.default='<div class="btn filter-count"> <span>{{filterCount}}</span> filter applied</div>\n'},MzSu:function(t,e,n){"use strict";var a=n("mrSG"),r=n("CcnG"),i=n("Ip0R"),o=n("gIcY"),l=function(){function t(){this.setSearch=new r.x,this.search="",this.lastSearch=""}return t.prototype.ngOnInit=function(){},t.prototype.searchResult=function(){(this.search.trim()||this.lastSearch)&&(this.lastSearch=this.search,this.setSearch.emit(this.search))},t.prototype.resetSearch=function(){this.search="",this.lastSearch="",this.setSearch.emit("")},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object)],t.prototype,"placeholder",void 0),a.__decorate([Object(r.S)(),a.__metadata("design:type",Object)],t.prototype,"setSearch",void 0),t=a.__decorate([Object(r.n)({selector:"app-search-filter",template:a.__importDefault(n("VvDc")).default,styles:[a.__importDefault(n("iQ7Y")).default]}),a.__metadata("design:paramtypes",[])],t)}(),s=n("SMsm"),c=n("seP3"),p=n("b716"),d=n("UodH");n.d(e,"a",(function(){return u}));var u=function(){function t(){}return t=a.__decorate([Object(r.L)({imports:[i.c,o.h,s.a,c.c,p.b,d.a],declarations:[l],exports:[l]})],t)}()},RrX5:function(t,e,n){"use strict";var a=n("mrSG"),r=n("CcnG"),i=n("Ip0R"),o=function(){function t(){this.maxDate=new Date}return t.prototype.ngOnInit=function(){var t=this;!0===this.dateObject.fromDetails&&(this.maxDate=null),this.minDateSubscriber=this.dateObject.fromDate.valueChanges.subscribe((function(e){e||(t.minDate=null)}))},t.prototype.dateChange=function(t){var e=t.value,n=new Date(e);this.minDate=new Date(n.getFullYear(),n.getMonth(),n.getDate()),this.dateObject.toDate.setValue(null)},t.prototype.setToDate=function(){if(this.dateObject.toDate.value){var t=new Date(this.dateObject.toDate.value);t.setHours(23),t.setMinutes(59),t.setSeconds(59),this.dateObject.toDate.setValue(t)}},t.prototype.ngOnDestroy=function(){this.minDateSubscriber.unsubscribe()},a.__decorate([Object(r.G)(),a.__metadata("design:type",Object)],t.prototype,"dateObject",void 0),t=a.__decorate([Object(r.n)({selector:"app-date-filter",template:a.__importDefault(n("qpK1")).default,styles:[a.__importDefault(n("T1hN")).default]}),a.__metadata("design:paramtypes",[])],t)}(),l=n("Wf4p"),s=n("jQLj"),c=n("seP3"),p=n("b716"),d=n("SMsm"),u=n("gIcY");n.d(e,"a",(function(){return m}));var m=function(){function t(){}return t=a.__decorate([Object(r.L)({declarations:[o],imports:[u.n,i.c,l.n,s.a,c.c,p.b,d.a],exports:[o]})],t)}()},T1hN:function(t,e,n){"use strict";n.r(e),e.default='h4 {\n  font-weight: 500;\n  line-height: 19.5px;\n  font-family: "Segoe UI";\n  color: #091e42;\n}'},VvDc:function(t,e,n){"use strict";n.r(e),e.default='\x3c!-- <mat-form-field>\n    <input type="text" matInput [placeholder]="placeholder" (keyup.enter)="searchResult()" [(ngModel)]="search">\n    <button type="button" mat-button *ngIf="search.trim()" matSuffix mat-icon-button aria-label="Clear" (click)="resetSearch()">\n    <mat-icon>close</mat-icon>\n  </button>\n    <button type="button" mat-button (click)="searchResult()" class="search-btn" matSuffix>\n    <img src="./assets/images/search.svg" alt="search">\n  </button>\n</mat-form-field> --\x3e\n\n\n<div class="searchWrapper">\n    <div class="form_filed_wrapper">\n        <mat-form-field appearance="outline">\n            <mat-label>{{placeholder}}</mat-label>\n            <input matInput [placeholder]="placeholder" (keyup)="searchResult()" [(ngModel)]="search">\n            <mat-icon class="clear" *ngIf="search.trim()" (click)="resetSearch()">close</mat-icon>\n        </mat-form-field>\n        <mat-icon class="search">search</mat-icon>\n    </div>\n\n    \x3c!-- <input type="text" [placeholder]="placeholder" (keyup.enter)="searchResult()" [(ngModel)]="search"> --\x3e\n    \x3c!-- <input type="text" [placeholder]="placeholder"  [(ngModel)]="search">\n  <button type="button" class="clear" mat-button *ngIf="search.trim()" matSuffix mat-icon-button aria-label="Clear"\n    (click)="resetSearch()">\n    <mat-icon>close</mat-icon>\n  </button>\n  <button type="button" class="search" (click)="searchResult()">\n    Search\n  </button> --\x3e\n</div>\n'},buKM:function(t,e,n){"use strict";var a=n("mrSG"),r=n("CcnG"),i=n("gIcY"),o=n("FaG1"),l=100,s=8,c=20,p=3,d=100,u=10,m=10,f=3,h=1e3,b=1,g=10,_=2,v=20;n.d(e,"a",(function(){return x}));var x=function(){function t(){this.VALIDATION={name:[i.o.pattern(o.a.alphabetsWithSpace),i.o.minLength(p),i.o.maxLength(d)],profileName:[i.o.pattern(o.a.name),i.o.minLength(p),i.o.maxLength(d)],alphabetic:[i.o.pattern(o.a.alphabetsWithSpace),i.o.minLength(p),i.o.maxLength(d)],alphaNumeric:[i.o.pattern(o.a.alphaNumericWithSpace),i.o.minLength(p),i.o.maxLength(d)],price:[i.o.pattern(o.a.price),i.o.minLength(b),i.o.maxLength(g),i.o.min(0)],seatingCapacity:[i.o.required,i.o.pattern(o.a.phone),i.o.min(_),i.o.max(v)],email:[i.o.pattern(o.a.email),i.o.maxLength(l)],description:[i.o.pattern(o.a.name),i.o.minLength(f),i.o.maxLength(h)],password:[i.o.pattern(o.a.password),i.o.minLength(s),i.o.maxLength(c)],phone:[i.o.required,i.o.pattern(o.a.phone),i.o.minLength(u),i.o.maxLength(m)],crfLimitMonth:[i.o.required,i.o.pattern(o.a.onlyNumber)],cutOff:[],dropdown:[],checkbox:[],address:[i.o.required],longitude:[i.o.required],latitude:[i.o.required],startShift:[i.o.required],endShift:[i.o.required],googleAddress:[i.o.required,i.o.minLength(p),i.o.maxLength(d)],noSpace:[i.o.required,i.o.pattern(o.a.noSpace)]}}return t.prototype.matchPassword=function(t){var e=t.get("password").value,n=t.get("confirmPassword").value;e!==n?t.get("confirmPassword").setErrors({matchPassword:!0}):e===n&&t.get("confirmPassword").errors&&(delete t.get("confirmPassword").errors.matchPassword,0===Object.keys(t.get("confirmPassword").errors).length&&t.get("confirmPassword").setErrors(null))},t.prototype.getControl=function(t,e){void 0===e&&(e=!0);var n=this.VALIDATION[t].slice();return e&&("checkbox"===t?n.splice(0,0,i.o.requiredTrue):n.splice(0,0,i.o.required)),["",i.o.compose(n)]},t.prototype.getFilterFormControls=function(t){for(var e={},n=0,a=t;n<a.length;n++){e[a[n]]=[null]}return e},t=a.__decorate([Object(r.D)({providedIn:"root"}),a.__metadata("design:paramtypes",[])],t)}()},"c5r+":function(t,e,n){"use strict";n.r(e),e.default='<h4>\n  \x3c!-- {{dropdown.label}} --\x3e\n  &nbsp;\n</h4>\n<mat-form-field>\n  <mat-select [placeholder]="dropdown.label" [formControl]="dropdown.control">\n    <mat-option [value]="\'\'">All</mat-option>\n    <mat-option *ngFor="let item of dropdown.list" [value]="item.value">{{\n      item.viewValue\n    }}</mat-option>\n  </mat-select>\n</mat-form-field>\n'},iQ7Y:function(t,e,n){"use strict";n.r(e),e.default=".search_filter .mat-form-field-suffix .mat-icon {\n  color: #333 !important;\n}\n\n.search-btn {\n  min-width: 37px;\n  padding: 0 10px;\n}\n\n.searchWrapper {\n  position: relative;\n  margin: 3px 0 0 0;\n  width: 80%;\n}\n\n.searchWrapper input {\n  width: 89%;\n  height: auto;\n  padding: 6px 25px 6px 12px;\n  border-radius: 3px;\n  box-shadow: none;\n  -webkit-transition: border linear 0.2s, -webkit-box-shadow linear 0.2s;\n  -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;\n  transition: border linear 0.2s, box-shadow linear 0.2s;\n}\n\n.searchWrapper .clear {\n  position: absolute;\n  right: 15px;\n  top: 15px;\n  width: 30px;\n  height: 30px;\n  font-size: 16px;\n  cursor: pointer;\n  outline: none;\n}\n\n.searchWrapper .search {\n  border-color: transparent;\n  border-radius: 4px;\n  margin: 0px 0 0 10px;\n  padding: 7px 10px;\n  outline: none;\n  cursor: pointer;\n  position: absolute;\n  top: 16px;\n  right: 10px;\n  font-size: 19px;\n  padding: 0;\n  background: #fff;\n}\n\n.white_wrapper .flex_row {\n  -webkit-box-align: start;\n          align-items: flex-start;\n}\n\n.white_wrapper .flex_row .flex_col_sm_7 {\n  margin-top: 20px;\n}\n\n:host ::ng-deep .searchWrapper .mat-form-field-appearance-outline .mat-form-field-infix {\n  padding: 0.4em 0 !important;\n  border-top: 0.14375em solid transparent;\n}\n\n:host ::ng-deep .searchWrapper .mat-form-field-appearance-outline .mat-form-field-label {\n  top: 1.9em !important;\n}\n\n:host ::ng-deep .searchWrapper .mat-form-field-appearance-outline .mat-form-field-label mat-label {\n  font-size: 14px;\n}\n\n:host ::ng-deep .searchWrapper .mat-form-field-appearance-outline.mat-form-field-should-float.mat-focused .mat-form-field-label {\n  top: 2.4em !important;\n}\n\n:host ::ng-deep .form_filed_wrapper {\n  margin: 0;\n}\n\n:host ::ng-deep .form_filed_wrapper .mat-form-field-wrapper {\n  padding: 0;\n}"},q8mc:function(t,e,n){"use strict";n.r(e),e.default=".filter-count {\n  cursor: default;\n  pointer-events: none;\n  color: #636F73;\n  font-size: 13px;\n}"},qpK1:function(t,e,n){"use strict";n.r(e),e.default='<h4>{{dateObject.label}}</h4>\n<div class="flex_row">\n  <div class="flex_col_sm_6">\n    <mat-form-field>\n      <input matInput [matDatepicker]="picker1" [formControl]="dateObject.fromDate" [max]="maxDate" (click)="picker1.open()"\n        (dateChange)="dateChange($event)" placeholder="From Date" readonly>\n      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>\n      <mat-datepicker #picker1></mat-datepicker>\n    </mat-form-field>\n  </div>\n  <div class="flex_col_sm_6">\n    <mat-form-field>\n      <input #toDate matInput [formControl]="dateObject.toDate" (dateChange)="setToDate()" [max]="maxDate" [min]="minDate"\n        [matDatepicker]="picker2" (click)="picker2.open()" placeholder="To Date" readonly>\n      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>\n      <mat-datepicker #picker2></mat-datepicker>\n    </mat-form-field>\n  </div>\n</div>\n'},utZl:function(t,e,n){"use strict";n.r(e),e.default=""},y3mR:function(t,e,n){"use strict";n.r(e),e.default='<div class="parentWrapper">\n    <div class="white_wrapper">\n        <div class="flex_row">\n            <div class="flex_col_sm_5 rowFilterBox">\n                        <app-search-filter [placeholder]="\'Search by name, email\'" (setSearch)="setSearch($event)">\n                        </app-search-filter>\n                        \x3c!-- archived - subAdmin --\x3e\n                        <ul class="archieveData">\n                            <li [routerLink]="\'SUBADMIN_ARCHIVE\' | absolutePath">\n                            <a>Archived</a>\n                            </li>\n                        </ul>\n                \n            </div>\n            \n            <div class="flex_col_sm_7">\n                <ul class="btn_wrapper text-right">\n                    <li>\n                        <div class="btn filter-count">Total number of subadmin : <span>{{total || 0}}</span> </div>\n                    </li>\n                    <li>\n                        <app-filter-count [filterCount]="appliedFilterCount"></app-filter-count>\n                    </li>\n                    <li> <button mat-raised-button (click)="showFilter=!showFilter" color="primary">\n                        <mat-icon>filter_list</mat-icon> Filter\n                    </button> </li>\n                    <li> <button mat-raised-button color="primary" [routerLink]="\'SUBADMIN_ADD\'|absolutePath" routerLinkActive="active">\n                            <mat-icon>add</mat-icon> Add New Sub Admin\n                        </button> </li>\n                    \n                </ul>\n            </div>\n        </div>\n        <div class="flex_row">\n            <ul class="breadcrumb">\n                <li>\n                    <a href="javascript:void(0)">Sub Admin</a>\n                </li>\n                <li>\n                    <a href="javascript:void(0)" class="active">List</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n\n    <div class="white_wrapper filter_wrapper" [class.filter_wrapper_show]="showFilter">\n        <div class="flex_row">\n            <div class="flex_col_sm_6">\n                <app-date-filter [dateObject]="filterObject.registrationDate">\n                </app-date-filter>\n            </div>\n            <div class="flex_col_sm_3">\n                <app-dropdown-filter [dropdown]="filterObject.status"></app-dropdown-filter>\n            </div>\n\n        </div>\n        <div class="flex_row">\n            <div class="flex_col_sm_10 text-center">\n\n                <ul class="btn_wrapper">\n                    <li> <button filter_btn mat-stroked-button [disabled]="disable()" (click)="resetFilter()">\n                            Reset\n                        </button>\n                    </li>\n                    <li>\n                        <button filter_btn mat-raised-button color="primary" [disabled]="disable()" (click)="filter()">\n                            Filter\n                        </button>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class="white_wrapper">\n        <table mat-table [dataSource]="subAdmins" matSort (matSortChange)="sortData($event)" class="mat-elevation-z8">\n\n            <ng-container matColumnDef="position">\n                <th mat-header-cell *matHeaderCellDef> S.No. </th>\n                <td mat-cell *matCellDef="let element;let i=index"> {{getSerialNumber(i+1)}}</td>\n            </ng-container>\n\n            <ng-container matColumnDef="name">\n                <th mat-header-cell *matHeaderCellDef> Full Name </th>\n                <td mat-cell *matCellDef="let element"><span [routerLink]="[\'SUBADMIN_DETAIL\'|absolutePath,element._id]" class="view_details td-text-wrap">{{element.name |checkNull}}</span> </td>\n            </ng-container>\n\n            <ng-container matColumnDef="email">\n                <th mat-header-cell *matHeaderCellDef> Email ID </th>\n                <td mat-cell *matCellDef="let element"> {{element.email |checkNull}} </td>\n            </ng-container>\n\n            <ng-container matColumnDef="registeredon">\n                <th mat-header-cell *matHeaderCellDef>\n                    <span [ngClass]="((isFilterApplied) && (filterForm.value.fromDate || filterForm.value.toDate))?\'appliedFilter\':\'\'">Created\n                        On </span>\n                </th>\n                <td mat-cell *matCellDef="let element"> {{element.created |customDate |checkNull}} </td>\n            </ng-container>\n\n            <ng-container matColumnDef="roles">\n                <th mat-header-cell *matHeaderCellDef> Number of roles </th>\n                <td mat-cell *matCellDef="let element"> {{element.totalCount || 0}} </td>\n            </ng-container>\n\n            <ng-container matColumnDef="status">\n                <th mat-header-cell *matHeaderCellDef>\n                    <span [ngClass]="((isFilterApplied) && (filterForm.value.status))?\'appliedFilter\':\'\'">Status\n                    </span>\n                </th>\n                <td mat-cell *matCellDef="let element">{{element?.status |status|titlecase|checkNull}}</td>\n            </ng-container>\n\n            <ng-container matColumnDef="action">\n                <th mat-header-cell *matHeaderCellDef> Actions </th>\n                <td mat-cell *matCellDef="let element">\n                    <button mat-button [matMenuTriggerFor]="menu" class="btn-more-menu">\n                        <mat-icon>more_vert</mat-icon>\n                    </button>\n                    <mat-menu #menu="matMenu" xPosition="before">\n                        <button mat-menu-item (click)="changeStatus(\'deleted\',element._id)">\n                            <mat-icon matTooltip="Delete">delete</mat-icon> Archive\n                        </button>\n                        <button mat-menu-item [routerLink]="[\'SUBADMIN_EDIT\'|absolutePath,element._id]">\n                            <mat-icon matTooltip="Edit">edit</mat-icon> Edit\n                        </button>\n                        <button mat-menu-item [ngClass]="element.status===\'blocked\'?\'ban\':\'noban\'" (click)="changeStatus((element.status===\'blocked\'?\'unblocked\':\'blocked\'),element._id)">\n                            <mat-icon matTooltip="{{element.status===\'blocked\'?\'Unblock\':\'Block\'}}">\n                                {{element.status===\'blocked\'?\'block\':\'block\'}}</mat-icon>\n                            {{element.status===\'blocked\'?\'un-block\':\'Block\'}}\n                        </button>\n                    </mat-menu>\n                </td>\n            </ng-container>\n\n            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\n            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\n        </table>\n    </div>\n    <div class="white_wrapper" *ngIf="total===0">\n        <h2 class="not-found">No Data Found</h2>\n    </div>\n    <div class="white_wrapper" *ngIf="subAdmins.data.length">\n        <mat-paginator [length]="total" [pageIndex]="page-1" [pageSize]="pageSize" [pageSizeOptions]="pageOptions" (page)="changePage($event)">\n        </mat-paginator>\n    </div>\n</div>\n'}}]);