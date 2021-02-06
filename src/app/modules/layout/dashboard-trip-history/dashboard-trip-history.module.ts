import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTripHistoryComponent } from './component/dashboard-trip-history.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [DashboardTripHistoryComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [DashboardTripHistoryComponent]
})
export class DashboardTripHistoryModule { }
