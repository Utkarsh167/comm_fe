import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { STAKEHOLDERS, ADMIN_PROFILE, RTLS, DASHBOARD, ROUTE, NOTI, ROSTER, WEBNOTI, SUBADMIN, REQUESTS, SHIFT, CAB_MAP, MAINNOTI, AUDITS, TRIP_HISTORY, CHANGE_PASSWORD, BILLING } from '../../constant/routes';
import { HomeGuard } from '../../guards/home.guard';

const adminRoutes: Routes = [
  {
    path: '', component: PagesComponent, children: [

      { path: '', redirectTo: STAKEHOLDERS, pathMatch: 'full' },
      {
        path: STAKEHOLDERS, loadChildren: './stakeholders/stakeholders.module#StakeholdersModule',
        canLoad: [HomeGuard], canActivate: [HomeGuard]
      },
      {
        path: ADMIN_PROFILE, loadChildren: '../profile/profile.module#ProfileModule',
        canLoad: [HomeGuard], canActivate: [HomeGuard], data: { defaultAccess: true }
      },
      {
        path: CHANGE_PASSWORD, loadChildren: '../change-password/change-password.module#ChangePasswordModule',
        canLoad: [HomeGuard], canActivate: [HomeGuard]
      },
      { path: RTLS, loadChildren: './rtls/rtls.module#RtlsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: DASHBOARD, loadChildren: './dashboard/dashboard.module#DashboardModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: ROUTE, loadChildren: './route/route.module#RouteModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: MAINNOTI, loadChildren: './main-notification/main-notification.module#MainNotificationModule' },

      // { path: NOTI, loadChildren: './notification/notification.module#NotificationModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      // { path: WEBNOTI, loadChildren: './admin-notifications/admin-notifications.module#AdminNotificationsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: SUBADMIN, loadChildren: './sub-admin/sub-admin.module#SubAdminModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: CAB_MAP, loadChildren: './cab-route-mapping/cab-route-mapping.module#CabRouteMappingModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: ROSTER, loadChildren: './roster/roster.module#RosterModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: REQUESTS, loadChildren: './requests/requests.module#RequestsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: SHIFT, loadChildren: './shift-management/shift-management.module#ShiftManagementModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: AUDITS, loadChildren: './audit-logs/audit-logs.module#AuditLogsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: TRIP_HISTORY, loadChildren: './trip/trip.module#TripModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      // billing modue -- satyam
      { path: BILLING, loadChildren: './billing/billing.module#BillingModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
