import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardVendorTripsComponent } from './component/dashboard-vendor-trips.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [DashboardVendorTripsComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [DashboardVendorTripsComponent]
})
export class DashboardVendorTripsModule { }
