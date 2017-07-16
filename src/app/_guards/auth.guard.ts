import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

export abstract class AuthGuard {

    router: Router;
    authenticationService: AuthenticationService;

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.isAllowed()) {
            return true;
        }
        this.redirect();
        return false
    }

    abstract isAllowed(): boolean;

    redirect(): void {
        this.router.navigate(['/login']);
    }
}
