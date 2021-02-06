import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsListComponent } from './component/requests-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatSelectModule, MatButtonModule } from '@angular/material';
// filter - satyam
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';

import {
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule
} from '@angular/material';
import { CancelledComponent } from '../cancelled/component/cancelled.component';
import { OtherRequestsComponent } from '../other-requests/component/other-requests.component';
import { SosComponent } from '../sos/component/sos.component';
import { RescheduleComponent } from '../reschedule/component/reschedule.component';
import { RequestListService } from './service/request-list.service';
// imported NoShowComponent - Shivakumar A
import { NoShowComponent } from '../no-show/no-show.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { RequestStatusModule } from 'src/app/pipes/request-status/request-status.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AssignVendorCabComponent } from '../reschedule/model/assign-vendor-cab/assign-vendor-cab.component';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { AddressChangeRequestComponent } from '../address-change-request/component/address-change-request.component';
// Badge Module - Shivakumar A 
import { MatBadgeModule } from '@angular/material/badge';

const routes: Routes = [
  { path: '', component: RequestsListComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    RequestStatusModule,
    CustomDatePipeModule,
    AbsoluteRoutingModule,
    MatSelectModule,
    ValidationErrorPipeModule,
    // Added Badge Module- Shivakumar A 
    MatBadgeModule,
    // filter -- satyam
    DateFilterModule,
    DropdownFilterModule,
    CustomDatePipeModule,
    SearchFilterModule,
    FilterCountModule,
  ],
  declarations: [RequestsListComponent, CancelledComponent, AddressChangeRequestComponent, OtherRequestsComponent, SosComponent, RescheduleComponent, NoShowComponent, AssignVendorCabComponent],
  providers: [RequestListService],
  entryComponents: [AssignVendorCabComponent]
})
export class RequestsListModule { }
