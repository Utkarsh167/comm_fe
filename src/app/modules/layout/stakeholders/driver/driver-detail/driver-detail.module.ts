import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverDetailComponent } from './component/driver-detail.component';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { DriverDetailService } from './service/driver-detail.service';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../../pipes/custom-image/custom-image.module';
import { FileTypeModule } from 'src/app/pipes/file-type/file-type.module';

@NgModule({
  declarations: [DriverDetailComponent],
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
        component: DriverDetailComponent
      }
    ]),
    FileTypeModule
  ],
  providers: [DriverDetailService]
})
export class DriverDetailModule { }
