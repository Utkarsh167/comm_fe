import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteInfoComponent } from './component/route-info/route-info.component';
import { Routes, RouterModule } from '@angular/router';
import { AbsoluteRoutingModule } from '../../../../pipes/absolute-routing/absolute-routing.module';
import {
  MatIconModule,
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatTableModule,
  MatMenuModule,
  MatTabsModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatPaginatorModule,
} from '@angular/material';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module';
import { RouteInfoService } from './service/route-info.service';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { FormsModule } from '@angular/forms';
import { GroupComponent } from './dialog/group/group.component';
import { AssignCabComponent } from './dialog/assign-cab/assign-cab.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
const routes: Routes = [
  {
    path: '',
    component: RouteInfoComponent
  }
];
@NgModule({
  declarations: [RouteInfoComponent,GroupComponent, AssignCabComponent],
  entryComponents: [GroupComponent, AssignCabComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchFilterModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatTabsModule,
    AbsoluteRoutingModule,
    GoogleMapModule,
    CheckNullPipeModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    ValidationErrorPipeModule
  ],
  providers: [RouteInfoService]
})
export class RouteInfoNewModule { }
