import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownFilterComponent } from './component/dropdown-filter.component';
import { MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropdownFilterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  exports: [DropdownFilterComponent]
})
export class DropdownFilterModule { }
