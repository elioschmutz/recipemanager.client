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

  logout(): Observable<object> {
      this.user = null;
      return this.http.post(this.config.getApiEndpoint('logout'), {});
  }

  login(username: string, password: string): Observable<User> {
      let loginRequest = this.http.post(this.config.getApiEndpoint('login'), {
          username: username,
          password: password,
      })
      loginRequest = loginRequest.do(
          (user: User) => {
              this.user = user;
          }
       );

      return loginRequest;
  }
  isAuthenticated(): boolean {
      return this.user !== null;
  }
  isAdmin(): boolean {
      return this.isAuthenticated() && this.userRoles.admin.includes(this.user.role);
  }
  isMember(): boolean {
      return this.isAuthenticated() && this.userRoles.member.includes(this.user.role);
  }
  getCurrentUser(): User{
      return this.user;
  }
  /**
    * Resets the current user with the current cookie.
    */
  resetUser(): Observable<User> {
      let resetUserRequest = this.http.get(this.config.getApiEndpoint('currentUser'));
      resetUserRequest = resetUserRequest.do(
          (user: User) => {
              this.user = user;
          }
       );

      return resetUserRequest;
  }
  register(data): Observable<User> {
      let registerRequest = this.http.post(this.config.getApiEndpoint('register'), data)
      return registerRequest;
  }

}
