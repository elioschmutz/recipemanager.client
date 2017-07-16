import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {

  private userRoles = {
      admin: ['member', 'admin'],
      member: ['member']
  }
  private authenticated: boolean = false;
  private user: User = null;

  constructor() {  }

  logout() {
      this.authenticated = false;
      this.user = null;
  }
  login(username: string, password: string): Promise<User> {
      return new Promise((resolve, reject) => {
          let self = this;
          setTimeout(function() {
              if (username == "max" && password == "test") {
                  self.authenticated = true;
                  self.user = {
                      _id: 1234,
                      username: 'max',
                      firstName: 'Max',
                      lastName: 'Muster',
                      role: 'member',
                  }

                  resolve(self.user);
              }
              reject();
          }, 1500);
      });
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
