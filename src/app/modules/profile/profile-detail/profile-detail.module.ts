import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import OWL_DATE_TIME_LOCALE Library for 24hr format - Shivakumar A
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ValidationErrorPipeModule } from '../../../pipes/validation-error/validation-error-pipe.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatDatepickerModule, MatProgressSpinnerModule, MatRadioModule, MatMenuModule, MatIconModule, MatDialogModule, MatTooltipModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';
import { ProfileService } from './service/profile.service';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module'
import { ViewWeekendsModule } from 'src/app/pipes/view-weekends/view-weekends.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { Hours25To12Module } from 'src/app/pipes/hours25-to12/hours25-to12.module';

@NgModule({
  declarations: [ViewComponent, EditComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationErrorPipeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatSlideToggleModule,
    CheckNullPipeModule,
    Hours25To12Module,
    ViewWeekendsModule,
    ShiftTimeModule,

    RouterModule.forChild([
      {
        path: '',
        component: ViewComponent
      }
    ])
  ],
  exports: [ViewComponent, EditComponent],
  // providers: [ProfileService]
  // 24hrs fromat -  Shivakumar A
  providers: [ProfileService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: "fr"},
  ]
})
export class ProfileDetailModule { }
