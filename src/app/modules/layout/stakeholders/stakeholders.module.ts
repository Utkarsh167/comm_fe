import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StakeholdersComponent } from './stakeholders.component';
import { EMPLOYEES, DRIVER, VENDOR, CAB, CAB_MAPPING } from '../../../constant/routes';
import { SharedModule } from '../../shared/shared.module';
import { HomeGuard } from '../../../guards/home.guard';
import { NgxPermissionsModule } from 'ngx-permissions';
let permission = JSON.parse(localStorage.getItem('adminPermission'));
let dynRoute;

if (permission.length) {
  permission.map(x => {
    if (x === 'employee') {
      dynRoute = { path: '', redirectTo: EMPLOYEES, pathMatch: 'full' };
    }
    else if (x === 'driver') {
      dynRoute = { path: '', redirectTo: DRIVER, pathMatch: 'full' };
    }
    else if (x === 'vendor') {
      dynRoute = { path: '', redirectTo: VENDOR, pathMatch: 'full' };
    }
    else if (x === 'cab') {
      dynRoute = { path: '', redirectTo: CAB, pathMatch: 'full' };
    }
    
  })
}
else {
  dynRoute = { path: '', redirectTo: EMPLOYEES, pathMatch: 'full' };
}


let stakeRoutes: Routes = [
  {
    path: '', component: StakeholdersComponent, children: [
      { path: EMPLOYEES, loadChildren: './employee/employee.module#EmployeeModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: DRIVER, loadChildren: './driver/driver.module#DriverModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: VENDOR, loadChildren: './vendor/vendor.module#VendorModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: CAB, loadChildren: './cab/cab.module#CabModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: CAB_MAPPING, loadChildren: './cab-mapping/cab-mapping.module#CabMappingModule', canLoad: [HomeGuard], canActivate: [HomeGuard] }
    ]
  }
];
stakeRoutes[0].children.unshift(dynRoute);




@NgModule({
  declarations: [StakeholdersComponent],
  imports: [
    RouterModule.forChild(stakeRoutes),
    CommonModule,
    SharedModule,
    NgxPermissionsModule
  ]

})
export class StakeholdersModule { }
