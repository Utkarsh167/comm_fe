import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeOnboardOffboardComponent } from './component/employee-onboard-offboard.component';

@NgModule({
  declarations: [EmployeeOnboardOffboardComponent],
  imports: [
    CommonModule,
  ],
  exports: [EmployeeOnboardOffboardComponent]
})
export class EmployeeOnboardOffboardModule { }
