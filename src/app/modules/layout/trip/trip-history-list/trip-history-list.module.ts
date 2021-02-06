import { LoginTripComponent } from "./component/login-trip/login-trip.component";
import { LogoutTripComponent } from "./component/logout-trip/logout-trip.component";
import { TripHistoryListComponent } from "./component/trip-history-list.component";
import { AbsoluteRoutingModule } from "./../../../../pipes/absolute-routing/absolute-routing.module";
import { DateFilterModule } from "./../../layout-shared/date-filter/date-filter.module";
import {
  MatIconModule,
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatTableModule,
  MatMenuModule,
  MatTabsModule,
  MatSelectModule,
  MatOptionModule,
  MatPaginatorModule,
    // imported MatSortModule - Shivakumar A
  MatSortModule
} from "@angular/material";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SearchFilterModule } from "../../layout-shared/search-filter/search-filter.module";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { ValidationErrorPipe } from "src/app/pipes/validation-error/validation-error.pipe";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { TripHistoryListService } from "./service/trip-history-list.service";
import { FilterCountModule } from "../../layout-shared/filter-count/filter-count.module";

const routes: Routes = [
  {
    path: "",
    component: TripHistoryListComponent
  }
];

@NgModule({
  declarations: [
    LoginTripComponent,
    LogoutTripComponent,
    TripHistoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SearchFilterModule,
    MatIconModule,
    MatButtonModule,
    DateFilterModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTabsModule,
    AbsoluteRoutingModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    ValidationErrorPipeModule,
    CustomDatePipeModule,
    FilterCountModule,
    // Added MatSortModule - Shivakumar A
    MatSortModule
  ],
  providers: [TripHistoryListService]
})
export class TripHistoryListModule {}
