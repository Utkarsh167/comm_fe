import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftManagementComponent } from './shift-management.component';
import { RouterModule, Routes } from '@angular/router';
import { SHIFT_LISTS, SHIFT_ADD } from 'src/app/constant/routes';

const routes: Routes = [
  {
    path: '', component: ShiftManagementComponent, children: [
      { path: '', redirectTo: SHIFT_LISTS, pathMatch: 'full' },
      { path: SHIFT_LISTS, loadChildren: './shift-list/shift-list.module#ShiftListModule' },
      { path: `${SHIFT_ADD}/:employeeId`, loadChildren: './shift-add/shift-add.module#ShiftAddModule' },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShiftManagementComponent]
})
export class ShiftManagementModule { }
