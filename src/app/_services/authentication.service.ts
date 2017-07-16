import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthenticationService {

  private userRoles = {
      admin: ['member', 'admin'],
      member: ['member']
  }
  private authenticated: boolean = false;
  private user: User = null;

  constructor(private http: HttpClient,
              private config: ConfigService) {  }

  logout() {
      this.authenticated = false;
      this.user = null;
      this.http.post(this.config.getApiEndpoint('logout'), {}).subscribe((data) => {
          console.log(data);
      });
  }
  login(username: string, password: string): Observable<User> {
      let loginRequest = this.http.post(this.config.getApiEndpoint('login'), {
          username: username,
          password: password,
      })
      loginRequest = loginRequest.do(
          (user: User) => {
              this.authenticated = true;
              this.user = user;
          }
       );

      return loginRequest;
  }
  isAuthenticated() {
      return this.authenticated;
  }
  isAdmin() {
      return this.isAuthenticated() && this.userRoles.admin.includes(this.user.role);
  }
  isMember() {
      return this.isAuthenticated() && this.userRoles.admin.includes(this.user.role);
  }
}
