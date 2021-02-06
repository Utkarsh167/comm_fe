import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route.component';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_PANEL } from 'src/app/constant/routes';
import { HomeGuard } from 'src/app/guards/home.guard';

const routemanagementRoutes: Routes = [
  {
    path: '', component: RouteComponent,

    children: [
      { path: '', redirectTo: ROUTE_PANEL, pathMatch: 'full' },
      { path: ROUTE_PANEL, loadChildren: './routepanel/routepanel.module#RoutepanelModule',
        canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routemanagementRoutes)
  ],
  declarations: [RouteComponent],
})
export class RouteModule { }
