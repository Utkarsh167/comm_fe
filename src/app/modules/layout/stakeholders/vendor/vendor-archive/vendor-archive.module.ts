import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorArchiveComponent } from './component/vendor-archive.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { Routes, RouterModule } from '@angular/router';
import { CustomImageModule } from 'src/app/pipes/custom-image/custom-image.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { VendorArchiveService } from './service/vendor-archive.service';


const routes: Routes = [
  {
    path: '',
    component: VendorArchiveComponent
  }
];

const MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatTooltipModule,
  MatSelectModule
]

@NgModule({
  declarations: [VendorArchiveComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ...MATERIAL,
    CheckNullPipeModule,
    AbsoluteRoutingModule,
    CustomDatePipeModule,
    ShiftTimeModule,
    CustomImageModule,
  ],
  providers:[VendorArchiveService]
})
export class VendorArchiveModule { }
