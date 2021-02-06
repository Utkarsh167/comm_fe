import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeArchiveComponent } from './component/employee-archive.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeArchiveService } from './service/employee-archive.service';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';


const routes: Routes = [
  {
    path: '',
    component: EmployeeArchiveComponent
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
  declarations: [EmployeeArchiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...MATERIAL,
    CheckNullPipeModule,
    AbsoluteRoutingModule,
    CustomDatePipeModule,
    ShiftTimeModule
  ],
  providers: [EmployeeArchiveService]
})
export class EmployeeArchiveModule { }
