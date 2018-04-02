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
      JSON.stringify({ userName: username, password: password, role: 'auto' }), this.options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.text();
        if (token === 'Cannot generate token.') {
          // return false to i ndicate failed login
          return false;
        } else {
          let token = response.text().substr(response.text().indexOf(' ') + 1);
          const role = response.text().substr(0, response.text().indexOf(' '));
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role: role }));
          // return true to indicate successful login
          return true;
        }
      });
  }

  // Create authorization header for JWT authentication
  createAuthorizationHeader(headers: Headers) {
    const jsonObj: User = JSON.parse(localStorage.getItem('currentUser'));
    const userObj: User = <User>jsonObj;
    headers.append('Authorization', 'Token ' + userObj.token);
  }

  returnUserRole() {
    const role = JSON.parse(localStorage.getItem('currentUser')).role;
    return role;
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
