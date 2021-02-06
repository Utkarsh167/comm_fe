import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ROSTER_LIST } from 'src/app/constant/routes';
import { HomeGuard } from 'src/app/guards/home.guard';
import { TripComponent } from './trip.component';


const tripRoutes: Routes = [
  {
    path: '', component: TripComponent,

    children: [
      { path: '', redirectTo: ROSTER_LIST, pathMatch: 'full' },
      { path: ROSTER_LIST, loadChildren: './trip-history-list/trip-history-list.module#TripHistoryListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];

@NgModule({
  declarations: [TripComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(tripRoutes)
  ]
})
export class TripModule { }
