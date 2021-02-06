import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DriverAddComponent } from './component/driver-add.component';
import {
  MatFormFieldModule, MatInputModule, MatRadioModule,
  MatButtonModule, MatIconModule,
  MatNativeDateModule, MatDatepickerModule
} from '@angular/material';
import { DriverAddService } from './service/driver-add.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../../pipes/validation-error/validation-error-pipe.module';
import { SharedModule } from '../../../../shared/shared.module';
import { NumberOnlyModule } from '../../../../../directives/number-only/number-only.module';

@NgModule({
  declarations: [DriverAddComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    NumberOnlyModule,
    SharedModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        component: DriverAddComponent
      }
    ])
  ],
  providers: [DriverAddService]
})
export class DriverAddModule { }
