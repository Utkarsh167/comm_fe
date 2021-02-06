import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './component/notification-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { NotificationListService } from './service/notification-list.service';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent
  }
];

@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    CheckNullPipeModule,
    MatSortModule,
    CustomDatePipeModule,
    SearchFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateFilterModule
  ],
  providers: [NotificationListService]
})
export class NotificationListModule { }
