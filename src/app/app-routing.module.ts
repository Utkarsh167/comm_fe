import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [{
  path: 'home', component: MyNavComponent,canActivate: [AuthGuard],
          children:[
              { path: '', component: WeatherComponent, canActivate: [AuthGuard]},
              ]
              },
  {path :'login',component : LoginComponent},
  { path: '**', redirectTo: 'home' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
