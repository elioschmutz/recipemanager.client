import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { RegistrationComponent }   from './registration/registration.component';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MemberAuthGuard } from './_guards';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'registration',  component: RegistrationComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [MemberAuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
