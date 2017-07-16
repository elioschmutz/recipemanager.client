import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

export interface AppConfiguration {
    apiServer: string;
    apiEndpoints: object;
}

@Injectable()
export class ConfigService {

  private currentConfig: AppConfiguration;
  private devConfig: AppConfiguration = {
      apiServer: 'http://localhost:8080/',
      apiEndpoints: {
          login: 'authentication/login',
          logout: 'authentication/logout',
          register: 'api/users/register',
          allUsers: 'api/users',
      },
  }
  private prodConfig: AppConfiguration = {
      apiServer: '',
      apiEndpoints: {},
  }
  constructor() {
      if (isDevMode) {
          this.currentConfig = this.devConfig;
      } else {
          this.currentConfig = this.prodConfig;
      }

  }

  getApiEndpoint(name: string): string {
      return this.currentConfig.apiServer.concat(
          this.currentConfig.apiEndpoints[name]);
  }
}
