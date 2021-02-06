import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from './component/date-filter.component';
import { MatNativeDateModule,MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DateFilterComponent],
  imports: [   
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports:[DateFilterComponent]
})
export class DateFilterModule { }
