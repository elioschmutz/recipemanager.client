import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';

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

import { AuthenticationService } from './_services/authentication.service';
import { AdminAuthGuard, MemberAuthGuard } from './_guards/index';


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
    FormsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdProgressBarModule,
  ],
  providers: [
    AuthenticationService,
    AdminAuthGuard,
    MemberAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
