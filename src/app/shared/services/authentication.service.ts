import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://localhost:5001/api/tokens';
  public isLoggedIn = new BehaviorSubject<boolean>(!!this.getToken());

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
  }
  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.token;
  }
  /*getUsername(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.username;
  }*/
  public isAuthenticated(): Observable<boolean> {
    // get the token aand notify listeners!
    return Observable.create(obs => {
      obs.next(this.getToken());
    });
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
}
