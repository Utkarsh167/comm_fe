import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './component/detail.component';
import { FindDriverNameModule } from '../../../../../pipes/find-driver-name/find-driver-name.module'
import { SortEmployeeModule } from 'src/app/pipes/sort-employee/sort-employee.module';
import { EmployeeStatusModule } from 'src/app/pipes/employee-status/employee-status.module';


@NgModule({
    declarations: [DetailComponent],
    imports: [
        CommonModule,
        FindDriverNameModule,
        SortEmployeeModule,
        EmployeeStatusModule

    ],
    exports: [DetailComponent]
})
export class CabDetailModule { }
