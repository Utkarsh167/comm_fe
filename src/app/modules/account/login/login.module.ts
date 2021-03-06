import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule
} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../pipes/validation-error/validation-error-pipe.module';
import { LoginService } from './service/login.service';
import { AccountGuard } from 'src/app/guards/account.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AccountGuard]  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
