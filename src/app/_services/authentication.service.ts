import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {

  authenticated = false;

  constructor() {  }

  logout() {
      console.log('logout user');
  }

  login(username: string, password: string): Promise<User> {
      return new Promise((resolve, reject) => {
          setTimeout(function() {
              if (username == "elio" && password == "elio") {
                  resolve(new User());
              }
              reject();
          }, 1500);
      });
  }
  isAuthenticated() {
      return this.authenticated;
  }
}
