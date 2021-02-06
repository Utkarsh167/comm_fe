import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminAddComponent } from './component/sub-admin-add.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SubAdminAddService } from './service/sub-admin-add.service';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { NospaceModule } from 'src/app/directives/nospace/nospace.module';

const addroutes: Routes = [
  {
    path: '', component: SubAdminAddComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(addroutes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ValidationErrorPipeModule,
    AbsoluteRoutingModule,
    NospaceModule
  ],
  declarations: [SubAdminAddComponent],
  providers: [SubAdminAddService]
})
export class SubAdminAddModule { }
