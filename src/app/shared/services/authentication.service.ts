import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://localhost:5001/api/tokens';
  public isLoggedIn = new BehaviorSubject<boolean>(!!this.getToken());
  public expired = new BehaviorSubject<boolean>(!!this.isTokenExpired());

  public login(username: string, password: string): Observable<string> {
    return this.http.post<any>(this.apiUrl, { username, password  })
      .pipe(
        switchMap(token => Observable.create(obs => {
            this.setToken(token);
            obs.next(token);
          })
        )
      );
  }
  public setToken(token: string) {
    localStorage.setItem('currentUser', JSON.stringify(token));
    this.isLoggedIn.next(!!token);
    this.expired.next(!!token);
  }
  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.token;
  }
  public clearToken() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn.next(undefined);
  }
  public logout(): Observable<boolean> {
    return Observable.create(obs => {
      this.clearToken();
      obs.next(!this.getToken());
    });
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }
}
