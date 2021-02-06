import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CabMappingListComponent } from './component/cab-mapping-list//cab-mapping-list.component';
import {
  MatTableModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatButtonModule, MatTooltipModule, MatPaginatorModule, MatSortModule,MatAutocompleteModule,
  MatOptionModule,
  MatDialogModule,
  MatSelectModule,
  MatMenuModule,
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { CabMappingService } from './service/cab-mapping.service';
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../pipes/custom-image/custom-image.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { AddMappingComponent } from './component/add-mapping/add-mapping.component';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { NumberOnlyModule } from '../../../../directives/number-only/number-only.module';
import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';

@NgModule({
  declarations: [
    CabMappingListComponent,
    AddMappingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatDialogModule,
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
    MatSelectModule,
    ValidationErrorPipeModule,
    NumberOnlyModule,
    MatOptionModule,
    FilterCountModule,
    MatMenuModule,
    ShiftTimeModule,
    RouterModule.forChild([
      {
        path: '',
        component: CabMappingListComponent
      }
    ])
  ],
  providers:[CabMappingService],
  entryComponents:[AddMappingComponent]
})
export class CabMappingModule { }
