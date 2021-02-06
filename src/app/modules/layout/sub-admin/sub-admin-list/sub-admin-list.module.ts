import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminListComponent } from './component/sub-admin-list.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { SubAdminListService } from './service/sub-admin-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';

const listroutes: Routes = [
  {
    path: '', component: SubAdminListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(listroutes),
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    DropdownFilterModule,
    DateFilterModule,
    FilterCountModule,
    CustomDatePipeModule,
    SearchFilterModule,
    CheckNullPipeModule,
    
  ],
  declarations: [SubAdminListComponent],
  providers: [SubAdminListService]
})
export class SubAdminListModule { }
