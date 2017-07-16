import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';


@Injectable()
export class AdminAuthGuard extends AuthGuard{

  constructor(authenticationService: AuthenticationService,
              router: Router) {
        super();

        this.authenticationService = authenticationService;
        this.router = router;
    }

    isAllowed() {
        return this.authenticationService.isAdmin();
    }
}
