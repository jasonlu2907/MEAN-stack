import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Observers
import { Observable, of } from 'rxjs';
// import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';

import { baseURL } from '../share/baseurl';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenToken: any;
  user: User;
  
  constructor(private http: HttpClient) { }
  
  registerUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(baseURL + 'users/register', user, httpOptions)
      .pipe(map(res => JSON.stringify(res)));
  }
  
  authenticateUser(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(baseURL + 'users/authenticate', user, httpOptions)
      .pipe(map(res => JSON.stringify(res)));
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem('id_token', token);
    // localStorage can only store a string, not Object
    localStorage.setItem('user', JSON.stringify(user));
    this.authenToken = token;
    this.user = user;
  }

  logout() {
    this.authenToken = null;
    this.user = null;
    localStorage.clear();
  }

  getUserProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authenToken
      })
    };
    return this.http.get(baseURL + 'users/profile', httpOptions)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authenToken = token;
  }

  isLoggedIn() {
    return tokenNotExpired('id_token');
  }
}

interface User {
  name?: string,
  username: string,
  password: string,
  email: string
}