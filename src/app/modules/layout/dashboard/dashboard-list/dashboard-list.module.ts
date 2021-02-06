import { MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardListComponent } from './component/dashboard-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { DashboardService } from './service/dashboard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardTripHistoryModule } from '../../dashboard-trip-history/dashboard-trip-history.module';
import { EmployeeOnboardOffboardModule } from '../../employee-onboard-offboard/employee-onboard-offboard.module';
import { DashboardVendorTripsModule } from '../../dashboard-vendor-trips/dashboard-vendor-trips.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardListComponent
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardTripHistoryModule,
    EmployeeOnboardOffboardModule,
    DashboardVendorTripsModule
  ],
  declarations: [DashboardListComponent],
  providers:[DashboardService]
})
export class DashboardListModule { }
