import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabAddComponent } from './component/cab-add.component';
import {
  MatFormFieldModule, MatInputModule,
  MatRadioModule, MatButtonModule, MatAutocompleteModule, MatOptionModule, MatSelectModule, MatIconModule
} from '@angular/material';
import { CabAddService } from './service/cab-add.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../../pipes/validation-error/validation-error-pipe.module';
import { SharedModule } from '../../../../shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NumberOnlyModule } from '../../../../../directives/number-only/number-only.module';

@NgModule({
  declarations: [CabAddComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NumberOnlyModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    RouterModule.forChild([
      { 
        path: '',
        component: CabAddComponent
      }
    ])
  ],
  providers: [CabAddService]
})
export class CabAddModule { }
