import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Observers
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';

import { baseURL } from '../share/baseurl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>(baseURL + 'users/register', user, httpOptions);
      // .pipe(map(res => res.json()));
  }
}
