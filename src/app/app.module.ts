import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { from } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './modules/shared/services/messaging.service';
import { AsyncPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { BlobModule } from 'angular-azure-blob-service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxPermissionsModule.forRoot(),
    NotFoundModule,
    BlobModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
