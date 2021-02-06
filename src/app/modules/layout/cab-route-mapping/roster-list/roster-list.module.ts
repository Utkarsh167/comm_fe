import { AbsoluteRoutingModule } from './../../../../pipes/absolute-routing/absolute-routing.module';
import { DateFilterModule } from './../../layout-shared/date-filter/date-filter.module';
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
  MatCheckboxModule
} from '@angular/material';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterListComponent } from './component/roster-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { LoginRideComponent } from './component/login-ride/login-ride.component';
import { LogoutRideComponent } from './component/logout-ride/logout-ride.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RosterListServiceService } from './service/roster-list-service.service';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { AssignDateComponent } from './model/assign-date/assign-date.component';
import { ValidationErrorPipe } from 'src/app/pipes/validation-error/validation-error.pipe';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { UpdatedGroupComponent } from './component/updated-group/updated-group.component';
// deleteCabMapping -- satyam
import { DeleteCabMappingComponent } from './deleteCabMapping/delete-cab-mapping/delete-cab-mapping.component';
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
const routes: Routes = [
  {
    path: '',
    component: RosterListComponent
  }
];
@NgModule({
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTabsModule,
    AbsoluteRoutingModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    ValidationErrorPipeModule,
    CustomDatePipeModule
  ],
  declarations: [RosterListComponent, LoginRideComponent, LogoutRideComponent, AssignDateComponent, UpdatedGroupComponent, DeleteCabMappingComponent],
  providers: [RosterListServiceService],
  // Delete cab Mapping -- satyam
  entryComponents: [AssignDateComponent, DeleteCabMappingComponent]
})
export class RosterListModule { }
