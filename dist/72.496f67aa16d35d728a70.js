(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{Lfqn:function(a,t,e){"use strict";e.r(t),t.default=""},TnQw:function(a,t,e){"use strict";e.r(t),t.default="\n<router-outlet></router-outlet>"},"b3Y/":function(a,t,e){"use strict";e.r(t);var d=e("mrSG"),n=e("CcnG"),c=e("ZYCi"),o=e("Ip0R"),i=function(){function a(){}return a.prototype.ngOnInit=function(){},a=d.__decorate([Object(n.n)({selector:"app-cab",template:d.__importDefault(e("TnQw")).default,styles:[d.__importDefault(e("Lfqn")).default]}),d.__metadata("design:paramtypes",[])],a)}(),l=e("+7By"),r=e("nvHE");e.d(t,"CabModule",(function(){return b}));var u=[{path:"",component:i,children:[{path:"",loadChildren:"./cab-list/cab-list.module#CabListModule",canLoad:[r.a],canActivate:[r.a]},{path:l.b,loadChildren:"./cab-add/cab-add.module#CabAddModule",canLoad:[r.a],canActivate:[r.a]},{path:l.f,loadChildren:"./cab-archive/cab-archive.module#CabArchiveModule",canLoad:[r.a],canActivate:[r.a]},{path:l.q+"/:cabId",loadChildren:"./cab-add/cab-add.module#CabAddModule",canLoad:[r.a],canActivate:[r.a]},{path:":cabId",loadChildren:"./cab-detail/cab-detail.module#CabDetailModule",canLoad:[r.a],canActivate:[r.a]}]}],b=function(){function a(){}return a=d.__decorate([Object(n.L)({declarations:[i],imports:[c.e.forChild(u),o.c]})],a)}()}}]);