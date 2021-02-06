import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabArchiveComponent } from './component/cab-archive.component';
import { Routes, RouterModule } from '@angular/router';
import { CabArchiveService } from './service/cab-archive.service';
import { FilterCountModule } from './../../../layout-shared/filter-count/filter-count.module';
import {
  MatTableModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatButtonModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
  MatOptionModule,
  MatMenuModule,
} from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../../pipes/custom-image/custom-image.module';
import { DateFilterModule } from '../../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../../layout-shared/search-filter/search-filter.module';

const routes: Routes = [
  {
    path: '',
    component: CabArchiveComponent
  }
];

@NgModule({
  declarations: [CabArchiveComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    MatSortModule,
    CustomDatePipeModule,
    CustomImageModule,
    DateFilterModule,
    DropdownFilterModule,
    SearchFilterModule,
    MatAutocompleteModule,
    MatMenuModule,
    FilterCountModule,
    MatOptionModule,
    RouterModule.forChild(routes),
  ],
  providers: [CabArchiveService]
})
export class CabArchiveModule { }
