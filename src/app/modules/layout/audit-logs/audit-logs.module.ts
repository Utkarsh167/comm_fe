import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogsComponent } from './component/audit-logs.component';
import { Routes, RouterModule } from '@angular/router';
import { AUDITS } from 'src/app/constant/absolute-routes';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { DateFilterModule } from '../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../layout-shared/dropdown-filter/dropdown-filter.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { SearchFilterModule } from '../layout-shared/search-filter/search-filter.module';
import { FilterCountModule } from '../layout-shared/filter-count/filter-count.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { AuditLogsService } from './service/audit-logs.service';


const routes: Routes = [
  {
    path: '', component: AuditLogsComponent, children: [
      { path: '', redirectTo: AUDITS, pathMatch: 'full' },
    ]
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
  declarations: [AuditLogsComponent],
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
  providers: [AuditLogsService]
})
export class AuditLogsModule { }
