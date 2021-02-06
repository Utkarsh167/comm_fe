import { GroupRouteDetailComponent } from './component/group-route-detail/group-route-detail.component';
import { MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatTabsModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutepanelComponent } from './component/routepanel.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { EmployeeComponent } from './dialog/employee/employee.component';
import { AssigncabComponent } from './dialog/cab/assigncab.component';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module';
import { ConfigurationComponent } from './dialog/configuration/configuration.component';
import { NumberOnlyModule } from '../../../../directives/number-only/number-only.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../pipes/validation-error/validation-error-pipe.module';
import { RoutePanelService } from './service/route-panel.service';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SortEmployeeModule } from 'src/app/pipes/sort-employee/sort-employee.module';
import { GroupLoginComponent } from './component/group-login/group-login.component';
import { GroupLogoutComponent } from './component/group-logout/group-logout.component';
import { GroupRouteBoxComponent } from './component/group-route-box/group-route-box.component';
import { DataService } from 'src/app/modules/shared/services/route-data.service';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { ShuffleComponent } from './dialog/shuffle/shuffle.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ValidateMergeComponent } from './dialog/validate-merge/validate-merge.component';

const routes: Routes = [
  {
    path: '',
    component: RoutepanelComponent
  }
];
@NgModule({
  declarations: [
    RoutepanelComponent,
    EmployeeComponent,
    AssigncabComponent,
    ConfigurationComponent,
    GroupLoginComponent,
    GroupLogoutComponent,
    GroupRouteBoxComponent,
    GroupRouteDetailComponent,
    ShuffleComponent,
    ValidateMergeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchFilterModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    GoogleMapModule,
    NumberOnlyModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationErrorPipeModule,
    CheckNullPipeModule,
    DropdownFilterModule,
    SortEmployeeModule,
    MatTabsModule,
    MatButtonModule,
    ShiftTimeModule,
    DragDropModule,
  ],
  entryComponents: [
    EmployeeComponent,
    AssigncabComponent,
    ConfigurationComponent,
    ShuffleComponent,
    ValidateMergeComponent
  ],
  providers: [RoutePanelService, DataService]
})
export class RoutepanelModule { }
