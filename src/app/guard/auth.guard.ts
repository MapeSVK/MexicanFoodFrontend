import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  canActivate() {

      if (this.authenticationService.isTokenExpired()) {
      this.logOut();
        return true;
      }
      // logged in so return true
    // not logged in so redirect to login page
    return true;
  }
  logOut() {
    this.authenticationService.logout()
      .pipe(
        take(1)
      ).subscribe(() => {
    });
  }
}
