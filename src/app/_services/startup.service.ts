import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StartupService {

    constructor(private authenticationService: AuthenticationService) { }

    /**
      * Tries to load the current user. The promise will be resolved anyway.
      * If there user cannot be reset, the router will redirect automatically
      * to the login page.
      */
    load(): Promise<any> {
        return this.authenticationService.resetUser().toPromise().then(
            (user) => {
                Promise.resolve();
            }, (err: any) => {
                Promise.resolve()
            });
    }
}
