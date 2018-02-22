import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { User } from '../dashboard/components/user/user.interface';
import { AppConstants } from '../app.constants';

@Injectable()
export class AuthenticationService {
  public token: string;
  options: RequestOptions;

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    const headers: any = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(AppConstants.TOKEN_URL,
      JSON.stringify({ userName: username, password: password, role: 'user' }), this.options)
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        const token = response.text();

        if (token !== 'Incorrect credentials') {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else if (response.text() === 'Incorrect credentials') {
          // return false to indicate failed login
          return false;
        }
      });
  }

  // Create authorization header for JWT authentication
  createAuthorizationHeader(headers: Headers) {
    const jsonObj: User = JSON.parse(localStorage.getItem('currentUser'));
    const userObj: User = <User>jsonObj;
    headers.append('Authorization', 'Token ' + userObj.token);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
