import { AbsoluteRoutingModule } from '../../../../pipes/absolute-routing/absolute-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupInfoComponent } from './component/group-info.component';
import { Routes, RouterModule } from '@angular/router';
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
  MatFormFieldModule
} from '@angular/material';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { GroupComponent } from './dialog/group/group.component';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module';
import { GroupInfoService } from './service/group-info.service';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: GroupInfoComponent
  }
];
@NgModule({
  declarations: [GroupInfoComponent, GroupComponent],
  entryComponents: [GroupComponent],
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
    FormsModule

  ],
  providers: [GroupInfoService]
})
export class GroupInfoModule { }
