import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Materialdesign Components
import { MdInputModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';


import 'hammerjs';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { AuthenticationService } from './_services';
import { AdminAuthGuard, MemberAuthGuard } from './_guards/index';
import { ConfigService } from './_services';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdProgressBarModule,
  ],
  providers: [
    AuthenticationService,
    ConfigService,
    AdminAuthGuard,
    MemberAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
