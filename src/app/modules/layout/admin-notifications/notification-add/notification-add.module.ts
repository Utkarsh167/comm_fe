import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationAddComponent } from './component/notification-add.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatMenuModule, MatTableModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { NotificationAddService } from './service/notification-add.service';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { NospaceModule } from 'src/app/directives/nospace/nospace.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationAddComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SearchFilterModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    ValidationErrorPipeModule,
    AbsoluteRoutingModule,
    NospaceModule

  ],
  declarations: [NotificationAddComponent],
  providers: [NotificationAddService]
})
export class NotificationAddModule { }
