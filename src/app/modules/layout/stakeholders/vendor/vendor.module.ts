import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT, ARCHIVE } from '../../../../constant/routes';
import { HomeGuard } from '../../../../guards/home.guard';







const vendorRoutes: Routes = [

  {
    path: '', component: VendorComponent, children: [
      { path: '', loadChildren: './vendor-list/vendor-list.module#VendorListModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: ADD, loadChildren: './vendor-add/vendor-add.module#VendorAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: ARCHIVE, loadChildren: './vendor-archive/vendor-archive.module#VendorArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:vendorId`, loadChildren: './vendor-add/vendor-add.module#VendorAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: `:vendorId`, loadChildren: './vendor-detail/vendor-detail.module#VendorDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard]}
    ]
  }

];













@NgModule({
  declarations: [VendorComponent],
  imports: [
    RouterModule.forChild(vendorRoutes),
    CommonModule
  ]
})
export class VendorModule { }
