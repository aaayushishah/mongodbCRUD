import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private prefix = environment.apipath;
  private suffix = '/user/';
  private httpWithoutInterceptor: HttpClient;
  constructor(private httpclient: HttpClient, private httpBackend: HttpBackend) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  /**
   * getAllUser
   */
  public getAllUser(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}${this.suffix}getAllUsers`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * addUser
   */
  public addUser(user): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}${this.suffix}createUser`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * updateUser
   */
  public updateUser(user): Observable<any> {
    return this.httpclient.put<any>(`${this.prefix}${this.suffix}updateUser`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * deleteUser
   */
  public deleteUser(id): Observable<any> {
    return this.httpclient.delete<any>(`${this.prefix}${this.suffix}deleteUser/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * logmein
   */
  public logmein(username, password) {
    debugger;
    return this.httpWithoutInterceptor.post<any>(`${this.prefix}${this.suffix}authenticate`, { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
