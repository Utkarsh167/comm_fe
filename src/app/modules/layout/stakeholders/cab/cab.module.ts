import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabComponent } from './cab.component';
import { ADD, EDIT, ARCHIVE } from '../../../../constant/routes';
import { HomeGuard } from '../../../../guards/home.guard';

const cabRoutes: Routes = [

  {
    path: '', component: CabComponent, children: [
      { path: '', loadChildren: './cab-list/cab-list.module#CabListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ADD, loadChildren: './cab-add/cab-add.module#CabAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ARCHIVE, loadChildren: './cab-archive/cab-archive.module#CabArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:cabId`, loadChildren: './cab-add/cab-add.module#CabAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ':cabId', loadChildren: './cab-detail/cab-detail.module#CabDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }

];


@NgModule({
  declarations: [CabComponent],
  imports: [
    RouterModule.forChild(cabRoutes),
    CommonModule
  ]
})
export class CabModule { }
