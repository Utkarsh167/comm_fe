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
  // merge roster -- satyam
  MatCheckboxModule
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
import { LoginRideComponent } from "./component/login-ride/login-ride.component";
import { LogoutRideComponent } from "./component/logout-ride/logout-ride.component";
import { RouteRosterListComponent } from "./component/route-roster-list.component";
import { RouteRosterListService } from "./service/route-roster-list.service";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { EditRosterComponent } from "./dialog/edit-roster/edit-roster.component";
import { ContinueRosterComponent } from "./dialog/continue-roster/continue-roster.component";
import { FilterCountModule } from "../../layout-shared/filter-count/filter-count.module";
import { MergeRosterComponent } from './dialog/merge-roster/merge-roster.component';
const routes: Routes = [
  {
    path: "",
    component: RouteRosterListComponent
  }
];

@NgModule({
  declarations: [
    LoginRideComponent,
    LogoutRideComponent,
    RouteRosterListComponent,
    EditRosterComponent,
    ContinueRosterComponent,
    MergeRosterComponent
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
    // merge roster -- satyam
    MatCheckboxModule
  ],
  providers: [RouteRosterListService],
  entryComponents: [EditRosterComponent, ContinueRosterComponent, MergeRosterComponent]
})
export class RouteRosterListModule {}
