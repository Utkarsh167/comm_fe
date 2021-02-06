import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './component/billing.component';
import { Routes, RouterModule } from '@angular/router';
import { BILLING } from 'src/app/constant/absolute-routes';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatTooltipModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { DateFilterModule } from '../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../layout-shared/dropdown-filter/dropdown-filter.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { SearchFilterModule } from '../layout-shared/search-filter/search-filter.module';
import { FilterCountModule } from '../layout-shared/filter-count/filter-count.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { BillingService } from './service/billing.service';



const routes: Routes = [
  {
    path: '', component: BillingComponent, children: [
      { path: '', redirectTo: BILLING, pathMatch: 'full' },
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
  MatSelectModule,
  MatDatepickerModule
]
@NgModule({
  declarations: [BillingComponent],
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
  providers: [BillingService]
})
export class BillingModule { }
