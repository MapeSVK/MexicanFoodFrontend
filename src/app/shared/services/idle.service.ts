import {Component, Inject, Injectable} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {take} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  loggedIn: boolean;
  idleState = 'Not started.';

  constructor(private idle: Idle, private keepalive: Keepalive, private authenticationService: AuthenticationService) {
    this.idle.setIdle(5);
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.authenticationService.logout()
        .pipe(
          take(1)
        ).subscribe(() => {
        this.loggedIn = false;
      });
    });
    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    this.keepalive.interval(15);
  }

  startIdle() {
    this.idle.watch();
    this.idleState = 'Started.';
  }
}

