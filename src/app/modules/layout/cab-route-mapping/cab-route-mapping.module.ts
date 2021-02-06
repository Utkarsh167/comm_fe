import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabRouteMappingComponent } from './cab-route-mapping.component';
import { Routes, RouterModule } from '@angular/router';
import { ROSTER_LIST, GROUP_INFO } from 'src/app/constant/routes';
import { HomeGuard } from 'src/app/guards/home.guard';

const rosterRoutes: Routes = [
  {
    path: '', component: CabRouteMappingComponent,

    children: [
      { path: '', redirectTo: ROSTER_LIST, pathMatch: 'full' },
      { path: ROSTER_LIST, loadChildren: './roster-list/roster-list.module#RosterListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${GROUP_INFO}/:id`, loadChildren: './group-info/group-info.module#GroupInfoModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rosterRoutes)
  ],
  declarations: [CabRouteMappingComponent]
})
export class CabRouteMappingModule { }
