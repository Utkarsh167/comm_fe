import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VendorAddComponent } from './component/vendor-add.component';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../../pipes/validation-error/validation-error-pipe.module';
import { VendorAddService } from './service/vendor-add.service';
import { SharedModule } from '../../../../shared/shared.module';
import { NumberOnlyModule } from '../../../../../directives/number-only/number-only.module';

@NgModule({
  declarations: [VendorAddComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    MatTooltipModule,
    SharedModule,
    NumberOnlyModule,
    RouterModule.forChild([
      {
        path: '',
        component: VendorAddComponent
      }
    ])
  ],
  providers: [VendorAddService]
})
export class VendorAddModule { }
