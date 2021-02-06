import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorDetailComponent } from './component/vendor-detail.component';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { VendorDetailService } from './service/vendor-detail.service';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from 'src/app/pipes/custom-image/custom-image.module';

@NgModule({
  declarations: [VendorDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    CheckNullPipeModule,
    CustomDatePipeModule,
    CustomImageModule,
    RouterModule.forChild([
      {
        path: '',
        component: VendorDetailComponent
      }
    ])
  ],
  providers: [VendorDetailService]
})
export class VendorDetailModule { }
