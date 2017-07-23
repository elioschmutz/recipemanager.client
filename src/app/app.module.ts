import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';

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
import { LogoutComponent } from './logout/logout.component';

import { AuthenticationService } from './_services';
import { AdminAuthGuard, MemberAuthGuard } from './_guards/index';
import { ConfigService } from './_services';
import { StartupService } from './_services';


export function startupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
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
    StartupService,
    {
    provide: APP_INITIALIZER,
    useFactory: startupServiceFactory,
    deps: [StartupService],
    multi: true
    },
    AuthenticationService,
    ConfigService,
    AdminAuthGuard,
    MemberAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
