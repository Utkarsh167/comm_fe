import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password.component';
import { AccountGuard } from '../../../guards/account.guard';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordService } from './service/forgot-password.service';
import { ValidationErrorPipeModule } from '../../../pipes/validation-error/validation-error-pipe.module';

const routes: Routes = [
  { path: '', component: ForgotPasswordComponent, canActivate: [AccountGuard]  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule
  ],
  declarations: [ForgotPasswordComponent],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule { }
