import { FilterCountModule } from './../../../layout-shared/filter-count/filter-count.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VendorListComponent } from './component/vendor-list.component';
import {
  MatTableModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatButtonModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatMenuModule
} from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { VendorListService } from './service/vendor-list.service';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../../pipes/custom-image/custom-image.module';
import { DateFilterModule } from '../../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../../layout-shared/search-filter/search-filter.module';

@NgModule({
  declarations: [VendorListComponent],
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
    FilterCountModule,
    MatMenuModule,
    RouterModule.forChild([
      {
        path: '',
        component: VendorListComponent
      }
    ])
  ],
  providers:[VendorListService]
})
export class VendorListModule { }
