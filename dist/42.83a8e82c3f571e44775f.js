(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{"1l64":function(n,t,e){"use strict";e.r(t),t.default='\n<div class="app-in-wrapper">\n    <app-header></app-header>\n    <div class="center_panel">\n\n        <router-outlet></router-outlet>\n\n        \x3c!-- <figure class="under_construction">\n            <img src="assets/images/under_construction.jpg">\n        </figure> --\x3e\n\n    </div>\n    <app-footer></app-footer>\n    \n</div>\n\n'},"7N7D":function(n,t,e){"use strict";e.r(t),t.default='<div *ngIf="onlineStatus === \'online\'" class="online">\n  <span>{{onlineStatusMessage}}</span>\n</div>\n\n<div *ngIf="onlineStatus === \'offline\'" class="offline">\n  <span>{{onlineStatusMessage}}</span>\n</div>'},GAhC:function(n,t,e){"use strict";e.r(t),t.default='<header>\n  <div class="inner_header">\n    <div class="brand-col">\n      <figure class="brand_wrap">\n        <img src="assets/images/new-logo.png" alt="Flet Management" />\n      </figure>\n    </div>\n\n    <div class="nav_wrapper">\n      <nav>\n        <ul *ngIf="adminRole == \'sub\'">\n          <li>\n            <a\n              [routerLink]="\'DASHBOARD\' | absolutePath"\n              routerLinkActive="active"\n              >Dashboard</a\n            >\n          </li>\n\n          <ng-template [ngxPermissionsOnly]="[\'rtls\']">\n            <li>\n              <a [routerLink]="\'RTLS\' | absolutePath" routerLinkActive="active"\n                >Live</a\n              >\n            </li>\n          </ng-template>\n\n          <ng-template\n            [ngxPermissionsOnly]="[\'employee\', \'cab\', \'driver\', \'vendor\']"\n          >\n            <li>\n              <a\n                [routerLink]="\'STAKEHOLDERS\' | absolutePath"\n                routerLinkActive="active"\n                >Stakeholders</a\n              >\n            </li>\n          </ng-template>\n\n          <ng-template [ngxPermissionsOnly]="[\'route\']">\n            <li>\n              <a [routerLink]="\'ROUTE\' | absolutePath" routerLinkActive="active"\n                >Route</a\n              >\n            </li>\n          </ng-template>\n\n          <ng-template [ngxPermissionsOnly]="[\'roster\']">\n            <li>\n              <a\n                [matMenuTriggerFor]="menu1"\n                [ngClass]="{\n                  active:\n                    _router.url === (\'CAB_ROUTE_MAP_LIST\' | absolutePath) ||\n                    _router.url === (\'ROSTER_LIST\' | absolutePath)\n                }"\n                >Roster</a\n              >\n              <mat-menu #menu1="matMenu">\n                <button\n                  mat-menu-item\n                  [routerLink]="\'CAB_ROUTE_MAP\' | absolutePath"\n                >\n                  Assign Cab\n                </button>\n                <button mat-menu-item [routerLink]="\'ROSTER\' | absolutePath">\n                  Roster\n                </button>\n              </mat-menu>\n            </li>\n          </ng-template>\n\n          \x3c!-- <ng-template [ngxPermissionsOnly]="[\'trip\']">\n            <li><a\n              routerLinkActive="active">Trip History</a></li>\n          </ng-template> --\x3e\n\n          \x3c!-- Added Link to Trip History - Shivakumar A --\x3e\n          <ng-template [ngxPermissionsOnly]="[\'trip\']">\n            <li><a \n              [routerLink]="\'TRIP_HISTORY\' | absolutePath"\n              routerLinkActive="active">Trip History</a></li>\n          </ng-template>\n          \x3c!-- <ng-template [ngxPermissionsOnly]="[\'audit\']">\n            <li><a routerLinkActive="active">Audit Log</a></li>\n          </ng-template> --\x3e\n\n          \x3c!-- Added Link to AuditLogs - Shivakumar A --\x3e\n          <ng-template [ngxPermissionsOnly]="[\'audit\']">\n            <li><a [routerLink]="\'AUDITS\' | absolutePath"\n               routerLinkActive="active">Audit Log</a></li>\n          </ng-template>\n\n          \x3c!-- <ng-template [ngxPermissionsOnly]="[\'request\']">\n            <li>\n              <a\n                [routerLink]="\'REQUESTS\' | absolutePath"\n                routerLinkActive="active"\n                >Requests</a\n              >\n            </li>\n          </ng-template> --\x3e\n          \x3c!-- Added Badge for Sub Admin - Shivakumar A --\x3e\n          <ng-template [ngxPermissionsOnly]="[\'request\']">\n            <li>\n              <div>\n                <a [routerLink]="\'REQUESTS\' | absolutePath" routerLinkActive="active" ><span *ngIf="TotalPendingData != null && TotalPendingCount > 0" matBadgeSize="small" matBadge={{TotalPendingCount}} matBadgeOverlap="true" matBadgeColor="warn">Requests</span></a>\n                <a [routerLink]="\'REQUESTS\' | absolutePath" routerLinkActive="active" ><span *ngIf="TotalPendingData != null && TotalPendingCount == 0">Requests</span></a>\n              </div>\n            </li>\n          </ng-template>\n\n          <ng-template [ngxPermissionsOnly]="[\'shift\']">\n            <li>\n              <a [routerLink]="\'SHIFT\' | absolutePath" routerLinkActive="active"\n                >User\'s Shift</a\n              >\n            </li>\n          </ng-template>\n        </ul>\n\n        <ul *ngIf="adminRole == \'admin\'">\n          <li>\n            <a\n              [routerLink]="\'DASHBOARD\' | absolutePath"\n              routerLinkActive="active"\n              >Dashboard</a\n            >\n          </li>\n\n          <li>\n            <a [routerLink]="\'RTLS\' | absolutePath" routerLinkActive="active"\n              >Live</a\n            >\n          </li>\n\n          <li>\n            <a\n              [routerLink]="\'STAKEHOLDERS\' | absolutePath"\n              routerLinkActive="active"\n              >Stakeholders</a\n            >\n          </li>\n\n          <li>\n            <a [routerLink]="\'ROUTE\' | absolutePath" routerLinkActive="active"\n              >Route</a\n            >\n          </li>\n\n          <li>\n            <a\n              [matMenuTriggerFor]="menu1"\n              [ngClass]="{\n                active:\n                  _router.url === (\'CAB_ROUTE_MAP_LIST\' | absolutePath) ||\n                  _router.url === (\'ROSTER_LIST\' | absolutePath)\n              }"\n              >Roster</a\n            >\n            <mat-menu #menu1="matMenu">\n              <button\n                mat-menu-item\n                [routerLink]="\'CAB_ROUTE_MAP_LIST\' | absolutePath"\n                routerLinkActive="active"\n              >\n                Assign Cab\n              </button>\n              <button\n                mat-menu-item\n                [routerLink]="\'ROSTER_LIST\' | absolutePath"\n                routerLinkActive="active"\n              >\n                Roster\n              </button>\n            </mat-menu>\n          </li>\n\n          <li>\n            <a\n              [routerLink]="\'TRIP_HISTORY\' | absolutePath"\n              routerLinkActive="active"\n              >Trip History</a\n            >\n          </li>\n\n          <li>\n            <a [routerLink]="\'AUDITS\' | absolutePath" routerLinkActive="active"\n              >Audit Log</a\n            >\n          </li>\n\n          <li>\n            \x3c!-- <a\n              [routerLink]="\'REQUESTS\' | absolutePath"\n              routerLinkActive="active"\n              >Requests</a\n            > --\x3e\n            \x3c!-- Added Badge - Shivakumar A --\x3e\n            <div>\n              <a [routerLink]="\'REQUESTS\' | absolutePath" routerLinkActive="active" ><span *ngIf="TotalPendingData != null && TotalPendingCount > 0" matBadgeSize="small" matBadge={{TotalPendingCount}} matBadgeOverlap="true" matBadgeColor="warn">Requests</span></a>\n              <a [routerLink]="\'REQUESTS\' | absolutePath" routerLinkActive="active" ><span *ngIf="TotalPendingData != null && TotalPendingCount == 0">Requests</span></a>\n            </div>\n          </li>\n\n          <li>\n            <a [routerLink]="\'SHIFT\' | absolutePath" routerLinkActive="active"\n              >User\'s Shift</a\n            >\n          </li>\n\n          <li>\n            <a\n              [routerLink]="\'SUBADMIN\' | absolutePath"\n              routerLinkActive="active"\n              >Sub Admin</a\n            >\n          </li>\n          \x3c!-- billing module -- satyam --\x3e\n          \x3c!-- <li>\n            <a\n              [routerLink]="\'BILLING\' | absolutePath"\n              routerLinkActive="active"\n              >Billing</a\n            >\n          </li> --\x3e\n        </ul>\n      </nav>\n    </div>\n\n    <ng-template [ngxPermissionsOnly]="[\'notification\']">\n      <div\n        class="setting notification"\n        [routerLink]="\'ADMIN_NOTIFICATION\' | absolutePath"\n        routerLinkActive="active"\n      >\n        <figure class="setting_img">\n          <img src="assets/images/notification.svg" alt="Notification" />\n        </figure>\n      </div>\n    </ng-template>\n\n    <div\n      class="setting notification"\n      *ngIf="adminRole == \'admin\'"\n      [routerLink]="\'ADMIN_NOTIFICATION\' | absolutePath"\n      routerLinkActive="active"\n    >\n      <figure class="setting_img">\n        <img src="assets/images/notification.svg" alt="Notification" />\n      </figure>\n    </div>\n\n    <div class="setting">\n      <figure class="setting_img" [matMenuTriggerFor]="menu">\n        <span>{{ adminName | customName }}</span>\n      </figure>\n    </div>\n\n    <mat-menu #menu="matMenu">\n      <button mat-menu-item routerLink="/admin/profile">My Profile</button>\n      <button mat-menu-item routerLink="/admin/change-password">\n        Change Password\n      </button>\n      <button mat-menu-item (click)="logout()">Logout</button>\n    </mat-menu>\n  </div>\n</header>\n'},Lihs:function(n,t,e){"use strict";e.r(t);var a=e("mrSG"),i=e("CcnG"),o=e("Ip0R"),r=function(){function n(){}return n.prototype.ngOnInit=function(){},n=a.__decorate([Object(i.n)({selector:"app-pages",template:a.__importDefault(e("1l64")).default,styles:[a.__importDefault(e("UdTn")).default]}),a.__metadata("design:paramtypes",[])],n)}(),s=e("vblm"),l=e("iiAa"),u=e("FTgb"),c=e("ZYCi"),d=e("jRgp"),p=e("Oy5v"),m=e("xMyE"),g=e("9Z1F"),f=e("XlPw"),b=e("vc9X"),h=e("8Js9"),v=function(n){function t(t,e,a,i){var o=n.call(this)||this;return o._utilityService=t,o._http=e,o._router=a,o.request_list_service=i,o._router.events.subscribe((function(n){n instanceof c.b&&n.url!==p.LOGIN&&o.getTotalrequestsCount(n.url)})),o}return a.__extends(t,n),t.prototype.ngOnInit=function(){var n=this;this.adminName=localStorage.getItem("fleet-admin-name"),this.adminRole=localStorage.getItem("fleet-admin-role"),setInterval((function(){n.TotalPendingCount=parseInt(localStorage.getItem("COUNT"))}),1e3)},t.prototype.logout=function(){var n=this,t={title:s.f.logout,message:s.f.logoutConfirmation,yes:s.f.logout};this._utilityService.openDialog(t).subscribe((function(t){t&&n._http.post(d.lb,{}).pipe(Object(m.a)((function(t){200===t.statusCode&&(n._utilityService.clearStorage(),b.a.profileData=null,n._router.navigate([p.LOGIN]))})),Object(g.a)((function(t){return n._utilityService.showAlert(s.g,"error"),Object(f.a)(t)}))).subscribe()}))},t.prototype.getTotalrequestsCount=function(n){var t=this;if(n!==p.FORGOT_PASSWORD){var e=a.__assign({},this.validPageOptions);this.request_list_service.getCancelledRequests(e).subscribe((function(n){t.request_list_service.changeMessageData(n.data),t.TotalPendingData=n.data,t.TotalPendingCount=t.TotalPendingData.pendingSosCount+t.TotalPendingData.pendingAddressCount+t.TotalPendingData.pendingRescheduleCount+t.TotalPendingData.pendingOtherRequestsCount+t.TotalPendingData.pendingCancelledCount+t.TotalPendingData.pendingNoShowCount}))}},t.ctorParameters=function(){return[{type:l.a},{type:u.a},{type:c.d},{type:h.a}]},t=a.__decorate([Object(i.n)({selector:"app-header",template:a.__importDefault(e("GAhC")).default,styles:[a.__importDefault(e("P/sW")).default]}),a.__metadata("design:paramtypes",[l.a,u.a,c.d,h.a])],t)}(e("RzZf").a),k=e("bne5"),_=function(){function n(){this.subscriptions=[]}return n.prototype.ngOnDestroy=function(){this.subscriptions.forEach((function(n){return n.unsubscribe()}))},n.prototype.ngOnInit=function(){var n=this;this.onlineEvent=Object(k.a)(window,"online"),this.offlineEvent=Object(k.a)(window,"offline"),this.subscriptions.push(this.onlineEvent.subscribe((function(t){n.connectionStatusMessage="Back to online",n.connectionStatus="online"}))),this.subscriptions.push(this.offlineEvent.subscribe((function(t){n.connectionStatusMessage="Connection lost! You are not connected to internet",n.connectionStatus="offline"})))},n=a.__decorate([Object(i.n)({selector:"app-footer",template:a.__importDefault(e("l+vM")).default,styles:[a.__importDefault(e("nW36")).default]}),a.__metadata("design:paramtypes",[])],n)}(),x=e("+7By"),w=e("nvHE"),L=[{path:"",component:r,children:[{path:"",redirectTo:x.N,pathMatch:"full"},{path:x.N,loadChildren:"./stakeholders/stakeholders.module#StakeholdersModule",canLoad:[w.a],canActivate:[w.a]},{path:x.d,loadChildren:"../profile/profile.module#ProfileModule",canLoad:[w.a],canActivate:[w.a],data:{defaultAccess:!0}},{path:x.m,loadChildren:"../change-password/change-password.module#ChangePasswordModule",canLoad:[w.a],canActivate:[w.a]},{path:x.I,loadChildren:"./rtls/rtls.module#RtlsModule",canLoad:[w.a],canActivate:[w.a]},{path:x.n,loadChildren:"./dashboard/dashboard.module#DashboardModule",canLoad:[w.a],canActivate:[w.a]},{path:x.F,loadChildren:"./route/route.module#RouteModule",canLoad:[w.a],canActivate:[w.a]},{path:x.x,loadChildren:"./main-notification/main-notification.module#MainNotificationModule"},{path:x.O,loadChildren:"./sub-admin/sub-admin.module#SubAdminModule",canLoad:[w.a],canActivate:[w.a]},{path:x.j,loadChildren:"./cab-route-mapping/cab-route-mapping.module#CabRouteMappingModule",canLoad:[w.a],canActivate:[w.a]},{path:x.D,loadChildren:"./roster/roster.module#RosterModule",canLoad:[w.a],canActivate:[w.a]},{path:x.A,loadChildren:"./requests/requests.module#RequestsModule",canLoad:[w.a],canActivate:[w.a]},{path:x.K,loadChildren:"./shift-management/shift-management.module#ShiftManagementModule",canLoad:[w.a],canActivate:[w.a]},{path:x.g,loadChildren:"./audit-logs/audit-logs.module#AuditLogsModule",canLoad:[w.a],canActivate:[w.a]},{path:x.U,loadChildren:"./trip/trip.module#TripModule",canLoad:[w.a],canActivate:[w.a]},{path:x.h,loadChildren:"./billing/billing.module#BillingModule",canLoad:[w.a],canActivate:[w.a]}]}],A=function(){function n(){}return n=a.__decorate([Object(i.L)({imports:[c.e.forChild(L)],exports:[c.e]})],n)}(),y=e("mVsa"),S=e("FpXt"),P=function(){function n(){}return n.prototype.transform=function(n,t){if(n){var e,a=new Array;e=n.split(" ");for(var i=0;i<e.length;i++)a.push(e[i].charAt(0))}return a.length>1?a[0]+" "+a[1]:a[0]},n=a.__decorate([Object(i.W)({name:"customName"})],n)}(),T=function(){function n(){}return n=a.__decorate([Object(i.L)({declarations:[P],imports:[o.c],exports:[P]})],n)}(),O=e("Uq3Z"),R=function(){function n(){}return n.prototype.ngOnInit=function(){},a.__decorate([Object(i.G)(),a.__metadata("design:type",String)],n.prototype,"onlineStatusMessage",void 0),a.__decorate([Object(i.G)(),a.__metadata("design:type",String)],n.prototype,"onlineStatus",void 0),n=a.__decorate([Object(i.n)({selector:"app-online-status",template:a.__importDefault(e("7N7D")).default,styles:[a.__importDefault(e("YgpS")).default]}),a.__metadata("design:paramtypes",[])],n)}(),C=function(){function n(){}return n=a.__decorate([Object(i.L)({declarations:[R],imports:[o.c],exports:[R]})],n)}(),I=e("6Wmm"),M=e("O21H");e.d(t,"LayoutModule",(function(){return D}));var D=function(){function n(){}return n=a.__decorate([Object(i.L)({declarations:[r,v,_],imports:[o.c,A,y.a,S.a,T,O.a,C,I.a,M.RequestsListModule]})],n)}()},"P/sW":function(n,t,e){"use strict";e.r(t),t.default='header {\n  position: fixed;\n  width: 100%;\n  top: 0;\n  left: 0;\n  background: #fff;\n  padding: 4px 19px;\n  border-bottom: 1px solid #0000001a;\n  z-index: 999;\n}\n\n.inner_header {\n  display: -webkit-box;\n  display: flex;\n  padding: 4px 15px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n@media (max-width: 1400px) {\n  .brand-col {\n    width: 160px;\n  }\n}\n\n@media (max-width: 1300px) {\n  .brand-col {\n    width: 160px;\n  }\n}\n\n@media (max-width: 1150px) {\n  .brand-col {\n    width: 160px;\n    margin-top: 6px;\n  }\n}\n\n.brand-col img {\n  width: 250px;\n}\n\n.nav_wrapper {\n  -webkit-box-flex: 1;\n          flex: 1;\n  text-align: right;\n}\n\n.nav_wrapper nav ul {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.nav_wrapper nav ul li {\n  display: -webkit-box;\n  display: flex;\n  margin: 0 20px;\n}\n\n@media (max-width: 1600px) {\n  .nav_wrapper nav ul li {\n    margin: 0 15px;\n  }\n}\n\n@media (max-width: 1500px) {\n  .nav_wrapper nav ul li {\n    margin: 0 10px;\n  }\n}\n\n@media (max-width: 1400px) {\n  .nav_wrapper nav ul li {\n    margin: 0 7px;\n  }\n}\n\n@media (max-width: 1250px) {\n  .nav_wrapper nav ul li {\n    margin: 0 5px;\n  }\n}\n\n.nav_wrapper nav ul li a {\n  color: #091e42;\n  position: relative;\n  cursor: pointer;\n  font-size: 15px;\n  /* font-family: "Open Sans", sans-serif; */\n  font-weight: 400;\n  /* font-family: \'Segoe UI\'; */\n  line-height: 24px;\n}\n\n.nav_wrapper nav ul li a:before {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 1px;\n  background: #79f2c0;\n  content: "";\n  -webkit-transform: scaleX(0) translateZ(0);\n          transform: scaleX(0) translateZ(0);\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n  -webkit-transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);\n  -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);\n  transition: -webkit-transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);\n  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);\n  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), -webkit-transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);\n}\n\n.nav_wrapper nav ul li a.active {\n  color: #79f2c0;\n}\n\n.nav_wrapper nav ul li a.active:before {\n  -webkit-transform: scaleX(1) translateZ(0);\n          transform: scaleX(1) translateZ(0);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n\n.nav_wrapper nav ul li a:hover {\n  color: #79f2c0;\n}\n\n.nav_wrapper nav ul li a:hover:before {\n  -webkit-transform: scaleX(1) translateZ(0);\n          transform: scaleX(1) translateZ(0);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n\n@media (max-width: 1350px) {\n  .nav_wrapper nav ul li:last-child {\n    margin-right: 0;\n  }\n}\n\n.setting.notification {\n  position: relative;\n}\n\n.setting.notification figure {\n  background: #fff;\n  z-index: 99;\n}\n\n.setting.notification .circle {\n  border-radius: 50%;\n  border: 1px solid #80ffe2;\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  opacity: 0;\n  top: 10px;\n  right: 10px;\n  z-index: 1;\n  -webkit-animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);\n          animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);\n}\n\n.setting .setting_img {\n  margin: 0 0 0 30px;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  display: inherit;\n  background: #8d8d8d;\n  cursor: pointer;\n  outline: none;\n  -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n@media (max-width: 1350px) {\n  .setting .setting_img {\n    margin: 0 0 0 15px;\n  }\n}\n\n.setting .setting_img span {\n  color: #fff;\n  display: block;\n  font-size: 14px;\n}\n\n.setting .setting_img img {\n  width: 25px;\n  cursor: pointer;\n  -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);\n}\n\n@-webkit-keyframes scaleIn {\n  from {\n    -webkit-transform: scale(0.5, 0.5);\n            transform: scale(0.5, 0.5);\n    opacity: 0.5;\n  }\n  to {\n    -webkit-transform: scale(2.5, 2.5);\n            transform: scale(2.5, 2.5);\n    opacity: 0;\n  }\n}\n\n@keyframes scaleIn {\n  from {\n    -webkit-transform: scale(0.5, 0.5);\n            transform: scale(0.5, 0.5);\n    opacity: 0.5;\n  }\n  to {\n    -webkit-transform: scale(2.5, 2.5);\n            transform: scale(2.5, 2.5);\n    opacity: 0;\n  }\n}'},UdTn:function(n,t,e){"use strict";e.r(t),t.default=".app-in-wrapper {\n  position: relative;\n  min-height: 100%;\n  width: 100%;\n  padding: 56px 0 60px 0;\n  background: #faf9f8;\n}\n\n.center_panel {\n  width: 100%;\n  margin: 0 auto;\n  height: calc(100vh - 150px);\n  overflow-y: auto;\n}\n\n.under_construction img {\n  width: 100%;\n}"},YgpS:function(n,t,e){"use strict";e.r(t),t.default=".online {\n  background-color: green;\n  color: #ffffff;\n  padding: 10px;\n  text-align: center;\n  height: 100%;\n  animation: online-response 0.5s 1;\n  -webkit-animation: online-response 0.5s 1;\n  animation-fill-mode: forwards;\n  animation-delay: 2s;\n  -webkit-animation-delay: 1s;\n  /* Safari and Chrome */\n  -webkit-animation-fill-mode: forwards;\n}\n\n.offline {\n  background-color: red;\n  color: #ffffff;\n  padding: 10px;\n  text-align: center;\n  height: 100%;\n}\n\n@keyframes online-response {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes online-response {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}"},"l+vM":function(n,t,e){"use strict";e.r(t),t.default='<app-online-status [onlineStatusMessage]="connectionStatusMessage" [onlineStatus]="connectionStatus">\n</app-online-status>\n<footer>\n  <p>\n    &copy; All Right Reserved by Commutev 2019\n  </p>\n</footer>'},nW36:function(n,t,e){"use strict";e.r(t),t.default="footer {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  text-align: center;\n  padding: 20px 0;\n  background: #091e42;\n  color: #9e9e9e;\n}"}}]);