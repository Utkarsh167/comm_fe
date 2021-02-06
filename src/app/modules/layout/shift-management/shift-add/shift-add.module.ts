import { MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatDatepicker, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftAddComponent } from './component/shift-add.component';
import { RouterModule, Routes } from '@angular/router';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { ShiftAddService } from './service/shift-add.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
const routes: Routes = [
  {
    path: '', component: ShiftAddComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    ValidationErrorPipeModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AbsoluteRoutingModule
  ],
  declarations: [ShiftAddComponent],
  providers: [ShiftAddService],

})
export class ShiftAddModule { }
