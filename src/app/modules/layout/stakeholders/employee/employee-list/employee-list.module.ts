import { FilterCountModule } from './../../../layout-shared/filter-count/filter-count.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './component/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { EmployeeListService } from './service/employee-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { DateFilterModule } from '../../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../../layout-shared/search-filter/search-filter.module';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  }
];
const MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatTooltipModule,
  MatSelectModule
]
@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ...MATERIAL,
    ReactiveFormsModule,
    CheckNullPipeModule,
    DateFilterModule,
    DropdownFilterModule,
    CustomDatePipeModule,
    SearchFilterModule,
    FilterCountModule,
    ShiftTimeModule,
    RouterModule.forChild(routes)
  ],
  providers: [EmployeeListService]
})
export class EmployeeListModule { }
