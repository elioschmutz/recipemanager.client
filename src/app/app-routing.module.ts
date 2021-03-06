import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { LogoutComponent }   from './logout/logout.component';
import { RegistrationComponent }   from './registration/registration.component';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MemberAuthGuard } from './_guards';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'registration',  component: RegistrationComponent },
  { path: '',  component: DashboardComponent, canActivate: [MemberAuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
