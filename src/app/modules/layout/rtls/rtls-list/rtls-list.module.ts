import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchFilterModule } from '.././../layout-shared/search-filter/search-filter.module';
import { MatSelectModule } from '@angular/material';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module'
import { ListComponent } from './list/component/list.component';
import { RtlsListComponent } from './rtls-list.component';


const cabRoutes: Routes = [
  {
    path: '', component: RtlsListComponent, children: [
      { path: '', redirectTo:'list',pathMatch:'full'},
      { path: 'cab-view', loadChildren: './cab-view/cab-view.module#CabViewModule' },
      { path: 'list', loadChildren: './list/list.module#CabListModule' },
      // {
      //   path: 'list',
      //   loadChildren: () => import('./list/list.module').then(m => m.CabListModule)
      // },
      { path: `detail`, loadChildren: './detail/detail.module#CabDetailModule' },
    ]
  }

];
@NgModule({
  declarations: [RtlsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(cabRoutes),
    SearchFilterModule,
    MatSelectModule,
    GoogleMapModule
  ]
})
export class RtlsListModule { }
