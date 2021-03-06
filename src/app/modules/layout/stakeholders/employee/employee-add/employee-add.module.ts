import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './component/employee-add.component';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { EmployeeAddService } from './service/employee-add.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../../pipes/validation-error/validation-error-pipe.module';
import { SharedModule } from '../../../../shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NumberOnlyModule } from '../../../../../directives/number-only/number-only.module';
import { GooglePlacesModule } from 'src/app/directives/google-places/google-places.module';
import { NospaceModule } from 'src/app/directives/nospace/nospace.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

@NgModule({
  declarations: [EmployeeAddComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NumberOnlyModule,
    MatSelectModule,
    GooglePlacesModule,
    NospaceModule,
    RxReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeAddComponent
      }
    ])
  ],
  providers: [EmployeeAddService]
})
export class EmployeeAddModule { }
