import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { ADD, EDIT, ARCHIVE } from '../../../../constant/routes';
import { HomeGuard } from '../../../../guards/home.guard';





 

const employeeRoutes: Routes = [

  {
    path: '', component: DriverComponent, children: [
      { path: '', loadChildren: './driver-list/driver-list.module#DriverListModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: ADD, loadChildren: './driver-add/driver-add.module#DriverAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: ARCHIVE, loadChildren: './driver-archive/driver-archive.module#DriverArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:driverId`, loadChildren: './driver-add/driver-add.module#DriverAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: `:driverId`, loadChildren: './driver-detail/driver-detail.module#DriverDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard]}
    ]
  }

];






@NgModule({
  declarations: [DriverComponent],
  imports: [
    RouterModule.forChild(employeeRoutes), 
    CommonModule
  ]
})
export class DriverModule { }
