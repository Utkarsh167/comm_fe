import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailComponent } from './component/employee-detail.component';
import { MatButtonModule, 
          // roasterDetails - satyam
          MatTableModule,
          MatIconModule,
          MatPaginatorModule } 
from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { EmployeeDetailService } from './service/employee-detail.service';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
// employeeDetails roaster  :- satyam
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { DateFilterModule } from '../../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../../layout-shared/search-filter/search-filter.module';
import { FilterCountModule } from './../../../layout-shared/filter-count/filter-count.module';
// employeeStatus :- satyam
import { EmployeeStatusModule } from 'src/app/pipes/employee-status/employee-status.module';

@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    CheckNullPipeModule,
    ShiftTimeModule,
    // roasterDetails - satyam
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    CustomDatePipeModule,
    DateFilterModule,
    DropdownFilterModule,
    SearchFilterModule,
    FilterCountModule,
    // employeeStatus -- satyam
    EmployeeStatusModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeDetailComponent
      }
    ])
  ],
  providers: [EmployeeDetailService]
})
export class EmployeeDetailModule { }
