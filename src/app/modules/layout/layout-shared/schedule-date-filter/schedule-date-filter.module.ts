import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleDateFilterComponent } from './component/schedule-date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [ScheduleDateFilterComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [ScheduleDateFilterComponent]
})
export class ScheduleDateFilterModule { }
