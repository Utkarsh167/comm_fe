import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './services/http.service';
import { UtilityService } from './services/utility.service';
import { TokenInterceptor } from '../../Interceptors/token.interceptor';
import { HomeGuard } from '../../guards/home.guard';
import { AccountGuard } from '../../guards/account.guard';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
// reasonForArchive -- satyam
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  // reasonForArchive -- satyam
  MatFormFieldModule,
} from '@angular/material';
import { AbsoluteRoutingModule } from '../../pipes/absolute-routing/absolute-routing.module';
import { StatusPipe } from '../../pipes/status-pipe/status.pipe';
import { GroupEmployeeComponent } from './components/group-employee/group-employee.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { SortEmployeeModule } from 'src/app/pipes/sort-employee/sort-employee.module';
import { EmployeeStatusModule } from 'src/app/pipes/employee-status/employee-status.module';
// billing module
import {ExcelService} from './services/excel.service';


@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AbsoluteRoutingModule,
    NgxPermissionsModule,
    ShiftTimeModule,
    SortEmployeeModule,
    EmployeeStatusModule,
    // reasonForArchive -- satyam
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmationModalComponent,
    GroupEmployeeComponent,
    StatusPipe,
    GroupEmployeeComponent
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AbsoluteRoutingModule,
    StatusPipe
  ],
  entryComponents: [
    ConfirmationModalComponent,
    GroupEmployeeComponent
  ],
  providers: [
    HttpService,
    UtilityService,
    HomeGuard,
    AccountGuard,
    ExcelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
