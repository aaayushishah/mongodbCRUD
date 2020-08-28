import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthdataService {

  helper = new JwtHelperService();
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) { }

  public getToken(): string {
    if (isPlatformBrowser(this._platformId)) {
      try {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {

          return localStorage.getItem('token');
        } else {
          return null;
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }

  public setToken(token) {
    if (isPlatformBrowser(this._platformId)) {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }

    }
  }
  
  public isAuthenticated(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.decodeToken(token);
        } catch (Error) {
          return false;
        }
      }
      return false;
    }
  }
  public getDecodedToken(): any {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.decodeToken(token.token);
        } catch (Error) {
          return false;
        }
      }
      return false;
    }
  }
  public isTokeExpired(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.isTokenExpired(token.token);
        } catch (Error) {
          return true;
        }
      }
      return true;
    }
  }
  public isRefreshTokeExpired(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      const token: any = this.getToken();
      if (token && token !== null) {
        try {
          return this.helper.isTokenExpired(token.refreshtoken);
        } catch (Error) {
          return true;
        }
      }
      return true;
    }
  }
}
