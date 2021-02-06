import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlsMapComponent } from './component/rtls-map.component';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module'


const routes: Routes = [
  {
    path: '', component: RtlsMapComponent
  }
]
@NgModule({
  declarations: [RtlsMapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapModule
  ]
})
export class RtlsMapModule { }
