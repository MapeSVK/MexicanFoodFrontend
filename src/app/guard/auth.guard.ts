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
  loggedIn: boolean;
  canActivate() {

      if (this.authenticationService.isTokenExpired()) {
        this.authenticationService.logout()
          .pipe(
            take(1)
          ).subscribe(() => {
          this.loggedIn = false;
        });
        return true;
      }
      // logged in so return true
    // not logged in so redirect to login page
    return true;
  }
}
