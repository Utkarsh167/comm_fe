import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { Routes, RouterModule } from '@angular/router';
import { ROSTER_LIST, ROUTE_INFO } from 'src/app/constant/routes';
import { HomeGuard } from 'src/app/guards/home.guard';

const rosterRoutes: Routes = [
  {
    path: '', component: RosterComponent,

    children: [
      { path: '', redirectTo: ROSTER_LIST, pathMatch: 'full' },
      { path: ROSTER_LIST, loadChildren: './route-roster-list/route-roster-list.module#RouteRosterListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      // Roster view --satyam
      { path: `${ROUTE_INFO}/:id`, loadChildren: './route-info-new/route-info-new.module#RouteInfoNewModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rosterRoutes)
  ],
  declarations: [RosterComponent],
  entryComponents: [
    
  ],
})
export class RosterModule { }
