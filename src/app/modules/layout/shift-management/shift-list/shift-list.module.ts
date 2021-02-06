import { RequestComponent } from './component/request/component/request.component';
import { CurrentComponent } from './component/current/component/current.component';
import { HistoryComponent } from './component/history/component/history.component';
import { AbsoluteRoutingModule } from './../../../../pipes/absolute-routing/absolute-routing.module';
import { MatIconModule, MatButtonModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftListComponent } from './component/shift-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { ServiceListService } from './service/service-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { ViewWeekendsModule } from 'src/app/pipes/view-weekends/view-weekends.module';
import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';

const routes: Routes = [
  {
    path: '', component: ShiftListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchFilterModule,
    MatIconModule,
    AbsoluteRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    ShiftTimeModule,
    CustomDatePipeModule,
    ViewWeekendsModule,
    MatFormFieldModule,
    MatSelectModule,
    FilterCountModule
    
  ],
  declarations: [ShiftListComponent, RequestComponent, CurrentComponent, HistoryComponent],
  providers: [ServiceListService]
})
export class ShiftListModule { }
