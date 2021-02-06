import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { Routes, RouterModule } from '@angular/router';
import { REQUESTS_LISTS } from 'src/app/constant/routes';


const requestsRoutes: Routes = [
  {
    path: '', component: RequestsComponent,

    children: [
      { path: '', redirectTo: REQUESTS_LISTS, pathMatch: 'full' },
      { path: REQUESTS_LISTS, loadChildren: './requests-list/requests-list.module#RequestsListModule' },
      // { path: GROUP_INFO, loadChildren: './group-info/group-info.module#GroupInfoModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(requestsRoutes)
  ],
  declarations: [RequestsComponent],
})
export class RequestsModule { }

