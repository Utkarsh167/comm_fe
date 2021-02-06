import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabDetailComponent } from './component/cab-detail.component';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { CabDetailService } from './service/cab-detail.service';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../../pipes/custom-image/custom-image.module';
import { FileTypeModule } from '../../../../../pipes/file-type/file-type.module'

@NgModule({
  declarations: [CabDetailComponent],
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
        component: CabDetailComponent
      }
    ]),
    FileTypeModule
  ],
  providers: [CabDetailService]
})
export class CabDetailModule { }
