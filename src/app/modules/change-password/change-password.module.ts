import { MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { ChangePasswordService } from './service/change-password.service';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';

const passwordRoutes: Routes = [

  { path: '', component: ChangePasswordComponent },

]

const MATERILA_MODULE = [
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule
]

const PIPES_MODULE = [
  ValidationErrorPipeModule,
  AbsoluteRoutingModule
]

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(passwordRoutes),
    ...MATERILA_MODULE,
    ...PIPES_MODULE
  ],
  providers: [ChangePasswordService]
})
export class ChangePasswordModule { }
