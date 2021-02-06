import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule,LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { NZ_ICONS } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons'
import { IconDefinition } from '@ant-design/icons-angular'
import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeatherComponent,
    MyNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    /**
     * NgRx Store
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),

    /**
     * Nprogress Modules
     */
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,
    AppRoutingModule
  ],
  providers: [ ...LOCALE_PROVIDERS,
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
