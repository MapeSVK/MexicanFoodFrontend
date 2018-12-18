import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  canActivate() {
    if (!this.authenticationService.isTokenExpired()) {
      return true;
    }
    this.logOut();
    this.router.navigateByUrl('/404');
    return false;
  }
  logOut() {
    this.authenticationService.logout()
      .pipe(
        take(1)
      ).subscribe(() => {
    });
  }
}
