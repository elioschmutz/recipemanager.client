import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormBuilder }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { CategoryService } from './_services';
import { FormValidationService } from './_services';

import { WithCredentialsInterceptor } from './_interceptors';

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
    ReactiveFormsModule,
  ],
  providers: [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
    AuthenticationService,
    ConfigService,
    AdminAuthGuard,
    MemberAuthGuard,
    CategoryService,
    FormBuilder,
    FormValidationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
