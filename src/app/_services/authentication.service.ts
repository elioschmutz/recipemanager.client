import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private userRoles = {
      admin: ['member', 'admin'],
      member: ['member']
  }
  private user: User = null;

  constructor(private http: HttpClient,
              private config: ConfigService) {  }

  logout() {
      this.user = null;
      return this.http.post(this.config.getApiEndpoint('logout'), {});
  }

  login(username: string, password: string): Observable<User> {
      let loginRequest = this.http.post(this.config.getApiEndpoint('login'), {
          username: username,
          password: password,
      }, {withCredentials: true})
      loginRequest = loginRequest.do(
          (user: User) => {
              this.user = user;
          }
       );

      return loginRequest;
  }
  isAuthenticated() {
      return this.user !== null;
  }
  isAdmin() {
      return this.isAuthenticated() && this.userRoles.admin.includes(this.user.role);
  }
  isMember() {
      return this.isAuthenticated() && this.userRoles.member.includes(this.user.role);
  }
}
