import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverArchiveComponent } from './component/driver-archive.component';
import { Routes, RouterModule } from '@angular/router';
import { DriverArchiveService } from './service/driver-archive.service';
import {
  MatTableModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatButtonModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatMenuModule
} from '@angular/material';
import { SharedModule } from '../../../../shared/shared.module';
import { CheckNullPipeModule } from '../../../../../pipes/check-null/check-null-pipe.module';
import { CustomDatePipeModule } from '../../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../../pipes/custom-image/custom-image.module';

const routes: Routes = [
  {
    path: '',
    component: DriverArchiveComponent
  }
];

@NgModule({
  declarations: [DriverArchiveComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    CheckNullPipeModule,
    MatSortModule,
    CustomDatePipeModule,
    CustomImageModule,
    MatMenuModule,
  ],
  providers: [DriverArchiveService]
})
export class DriverArchiveModule { }
