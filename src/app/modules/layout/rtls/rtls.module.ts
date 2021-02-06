import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlsComponent } from './rtls.component';

const routes: Routes = [

  { path: '', loadChildren: './rtls-list/rtls-list.module#RtlsListModule' },

  { path: 'map', loadChildren: './rtls-map/rtls-map.module#RtlsMapModule' },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RtlsComponent]
})
export class RtlsModule { }
