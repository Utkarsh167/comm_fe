(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{"3kTl":function(e,a,n){"use strict";n.r(a),a.default='<div class="custom_container">\n    <div class="white_wrapper">\n        <h2 class="heading">Cab Detail</h2>\n\n        <div class="flex_row">\n            <ul class="breadcrumb">\n                <li>\n                    <a href="javascript:void(0)">Stakeholders</a>\n                </li>\n                <li>\n                    <a routerLink="/admin/stakeholders/cab">Cab</a>\n                </li>\n                <li>\n                    <a href="javascript:void(0)" class="active">Detail</a>\n                </li>\n            </ul>\n        </div>\n\n        <div class="form_wrapper" *ngIf="cab">\n            <div class="flex_row">\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Model Name</label>\n                        <span class="show_label">{{cab.cabModel}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Registration Number</label>\n                        <span class="show_label">{{cab.registrationNo}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Vehicle Type</label>\n                        <span class="show_label">{{cab.type}}\n                            \x3c!-- Added Medical cab icon - Shivakumar A --\x3e\n                            <b class="medical_cab_symbol_option" *ngIf="cab.type === medicalCabValue">&#43;</b>\n                        </span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="flex_row">\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Vendor Name</label>\n                        <span class="show_label">{{cab.vendor?.name}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Color</label>\n                        <span class="show_label">{{cab.color}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Capacity</label>\n                        <span class="show_label">{{cab.seatingCapacity}}</span>\n                    </div>\n                </div>\n\n            </div>\n\n\n            <div class="flex_row">\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">State Permit No.</label>\n                        <span class="show_label">{{cab.statePermitNumber}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">All Inida Permit No.</label>\n                        <span class="show_label">{{cab.countryPermitNumber}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Fuel Type</label>\n                        <span class="show_label">{{getViewValue(\'fuelType\')}}</span>\n                    </div>\n                </div>\n            </div>\n\n\n            <div class="flex_row">\n\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Transmission Type</label>\n                        <span class="show_label">{{getViewValue(\'transmissionType\')}}</span>\n                    </div>\n                </div>\n\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        \x3c!-- <label class="form_label">Cab Badge Number</label> --\x3e\n                        \x3c!-- changed to Cab ID - Shivakumar A--\x3e\n                        <label class="form_label">Cab ID</label>\n                        <span class="show_label">{{cab.routeNo|checkNull}}</span>\n                    </div>\n                </div>\n\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Driver Cum/Owner</label>\n                        <span class="show_label">{{getViewValue(\'driverOwner\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="flex_row">\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Driver Only</label>\n                        <span class="show_label">{{getViewValue(\'driverOnly\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">AC</label>\n                        <span class="show_label">{{getViewValue(\'ac\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Panic Button</label>\n                        <span class="show_label">{{getViewValue(\'panicButton\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n            </div>\n            <div class="flex_row">\n\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Transmission Type</label>\n                        <span class="show_label">{{getViewValue(\'transmissionType\')}}</span>\n                    </div>\n                </div>\n\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Spare Wheel</label>\n                        <span class="show_label">{{getViewValue(\'spareWheel\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">First Aid Kit</label>\n                        <span class="show_label">{{getViewValue(\'firstAidKit\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n            </div>\n\n            <div class="flex_row">\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Torch & Umbrellas</label>\n                        <span class="show_label">{{getViewValue(\'torchAmbrella\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Fire Extingusher</label>\n                        <span class="show_label">{{getViewValue(\'fireExtingusher\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_3">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">VEH Condition Exterior And Exterior</label>\n                        <span class="show_label">{{getViewValue(\'interiorExterior\',\'radioOption\')}}</span>\n                    </div>\n                </div>\n\n            </div>\n            <div class="flex_row">\n\n                <div class="flex_col_sm_5">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Driver Mapping</label>\n                        <span class="show_label" *ngIf="!cab.driverMapped?.length">Unassigned</span>\n                        <table *ngIf="cab.driverMapped?.length">\n                            <tr>\n                                <th>Driver</th>\n                                <th>Shift</th>\n                            </tr>\n                            <tr *ngFor="let driver of cab.driverMapped">\n                                <td><a class="view_details"\n                                        [routerLink]="[\'DRIVER\'|absolutePath,driver._id]">{{driver.name}}</a></td>\n                                <td>{{driver.startShift|date:\'shortTime\'}} - {{driver.endShift|date:\'shortTime\'}}</td>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n            <div class="flex_row aggrement">\n                <div class="flex_col_sm_3" *ngFor="let doc of docs">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">{{doc.viewValue}}</label>\n                        <span class="show_label">\n                            <a target="_blank" [href]="cab[doc.value]" *ngIf="cab[doc.value]">\n                                <figure class="sm_img_preview">\n                                    <img [src]="(cab[doc.value] | fileType)">\n                                </figure>\n                            </a>\n                            <ng-container *ngIf="!cab[doc.value]">\n                                {{\'N/A\'}}\n                            </ng-container>\n                        </span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="flex_row">\n                <div class="flex_col_sm_10">\n                    <div class="form_filed_wrapper_details text-center">\n                        <ul class="btn_wrapper">\n                            <li> \n                                    <button mat-raised-button color="primary" (click)="changeStatus(\'deleted\', cab._id, cab.driverMapped.length)">Archive</button>\n                                    <button mat-raised-button color="primary"\n                                    (click)="\n                                    changeStatus(\n                                        cab.status === \'blocked\' ? \'unblocked\' : \'blocked\',\n                                        cab._id, cab.driverMapped.length\n                                    )\n                                    ">\n                                  \n                                    {{ cab.status === "blocked" ? "un-block" : "Block" }}\n                                  </button>\n                                <button mat-raised-button [routerLink]="[\'EDIT_CAB\'|absolutePath,cab._id]"\n                                    color="primary">Edit</button> \n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'},"9sDP":function(e,a,n){"use strict";var l=n("mrSG"),i=n("CcnG"),s=n("Ip0R"),t=function(){function e(){}return e.prototype.transform=function(e,a){return null!=e?e:"-"},e=l.__decorate([Object(i.W)({name:"checkNull"}),l.__metadata("design:paramtypes",[])],e)}(),r=n("gIcY");n.d(a,"a",(function(){return o}));var o=function(){function e(){}return e=l.__decorate([Object(i.L)({imports:[s.c,r.n],declarations:[t],exports:[t]})],e)}()},"K/WQ":function(e,a,n){"use strict";n.r(a),a.default='@charset "UTF-8";\ntable {\n  border-collapse: collapse;\n  width: 100%;\n}\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #ddd;\n}\n.form_filed_wrapper_details {\n  margin-bottom: 50px;\n}\n.sm_img_preview {\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.sm_img_preview img {\n  width: 100px;\n  height: 100px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.flex_row {\n  display: -webkit-box;\n  display: flex;\n  margin: 0 -10px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.flex_row.aggrement {\n  flex-wrap: wrap;\n}\n.flex_row.aggrement a {\n  color: #006CB8;\n}\n.breadcrumb {\n  width: 100%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/ ";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after, .breadcrumb li:last-child a:before, .breadcrumb li:last-child a:after {\n  display: none;\n}\n.btn_wrapper li {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-flow: row;\n}\n.btn_wrapper li button {\n  margin: 0 15px;\n}\nbutton.mat-raised-button {\n  box-shadow: none !important;\n  border: 1px solid #79f2c0 !important;\n  min-width: 104px !important;\n}\n.medical_cab_symbol_option {\n  font-size: 20px;\n  color: red;\n}'},MNFV:function(e,a,n){"use strict";n.r(a);var l=n("mrSG"),i=n("CcnG"),s=n("Ip0R"),t=n("FTgb"),r=n("jRgp"),o=n("vblm"),c=n("iiAa"),d=function(){function e(e,a){this._http=e,this._utilityService=a}return e.prototype.getCabDetail=function(e){return this._http.get(r.v,{cabId:e})},e.prototype.changeStatus=function(e,a){return l.__awaiter(this,void 0,void 0,(function(){var n,i,s,t,c;return l.__generator(this,(function(l){switch(l.label){case 0:return l.trys.push([0,5,,6]),n=e.status.toUpperCase(),i={message:""+(a&&"unblocked"!==e.status?o.c:"")+o.d[n].confirm("Cab"),showTextBox:"DELETED"===n},[4,this._utilityService.openDialog(i).toPromise()];case 1:return(s=l.sent())?[4,t="DELETED"===n?this._http.post(r.t+"/"+e.cabId,{comment:s.note}).toPromise():this._http.post(r.n+e.cabId,{status:e.status}).toPromise()]:[3,3];case 2:return l.sent(),this._utilityService.showAlert(o.d[n].success("Cab")),[2,Promise.resolve(t)];case 3:return[2,Promise.reject()];case 4:return[3,6];case 5:return c=l.sent(),[2,Promise.reject(c)];case 6:return[2]}}))}))},e.ctorParameters=function(){return[{type:t.a},{type:c.a}]},e=l.__decorate([Object(i.D)(),l.__metadata("design:paramtypes",[t.a,c.a])],e)}(),_=n("ZYCi"),p=n("Oy5v"),b=n("yG5I"),u=function(){function e(e,a,n){this._cabDetailService=e,this._route=a,this._router=n,this.fuelType=b.d,this.transmissionType=b.n,this.carType=b.a,this.radioOption=b.j,this.docs=[{value:"aggrementCopy",viewValue:"Aggrement Copy"},{value:"companyIssuance",viewValue:"Company Issuance"},{value:"rgsCertificate",viewValue:"Registration Certificate"},{value:"fitnessCertificate",viewValue:"Fitness Certificate"},{value:"roadTax",viewValue:"Road Tax Experience"},{value:"insurance",viewValue:"Insurance Experience"},{value:"statePermitForm",viewValue:"State Permit Form-47"},{value:"allIndiaPermitForm",viewValue:"All India Permit Form-49"}]}return e.prototype.ngOnInit=function(){this.cabId=this._route.snapshot.params.cabId,this.getCabDetail(),this.medicalCabValue=b.a[4].viewValue},e.prototype.getFileName=function(e){return Object(b.p)(e)},e.prototype.getCabDetail=function(){var e=this;this._cabDetailService.getCabDetail(this.cabId).subscribe((function(a){a.data||e._router.navigate([p.CAB]),e.cab=a.data}),(function(a){e._router.navigate([p.CAB])}))},e.prototype.getViewValue=function(e,a){var n=this;return void 0===a&&(a=null),this[a||e].filter((function(a){return a.value===n.cab[e]}))[0].viewValue},e.prototype.changeStatus=function(e,a,n){return l.__awaiter(this,void 0,void 0,(function(){return l.__generator(this,(function(l){switch(l.label){case 0:return l.trys.push([0,2,,3]),[4,this._cabDetailService.changeStatus({status:e,cabId:a},n)];case 1:return l.sent(),this.getCabDetail(),[3,3];case 2:return l.sent(),[3,3];case 3:return[2]}}))}))},e.ctorParameters=function(){return[{type:d},{type:_.a},{type:_.d}]},e=l.__decorate([Object(i.n)({selector:"app-cab-detail",template:l.__importDefault(n("3kTl")).default,styles:[l.__importDefault(n("K/WQ")).default]}),l.__metadata("design:paramtypes",[d,_.a,_.d])],e)}(),f=n("UodH"),v=n("FpXt"),m=n("9sDP"),h=n("gdGC"),w=n("Wy86"),g=n("m7P3");n.d(a,"CabDetailModule",(function(){return x}));var x=function(){function e(){}return e=l.__decorate([Object(i.L)({declarations:[u],imports:[s.c,f.a,v.a,m.a,h.a,w.a,_.e.forChild([{path:"",component:u}]),g.a],providers:[d]})],e)}()},gdGC:function(e,a,n){"use strict";var l=n("mrSG"),i=n("CcnG"),s=n("Ip0R"),t=function(){function e(e){this.datePipe=e}return e.prototype.transform=function(e,a){return e?this.datePipe.transform(e,"dd/MM/yyyy"):"-"},e.ctorParameters=function(){return[{type:s.e}]},e=l.__decorate([Object(i.W)({name:"customDate"}),l.__metadata("design:paramtypes",[s.e])],e)}();n.d(a,"a",(function(){return r}));var r=function(){function e(){}return e=l.__decorate([Object(i.L)({imports:[s.c],declarations:[t],exports:[t],providers:[s.e]})],e)}()}}]);