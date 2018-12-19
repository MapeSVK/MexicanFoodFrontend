import {Component, Inject, Injectable} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {take} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {MatDialog} from '@angular/material';
import {DialogWindowComponent} from '../dialog-window/dialog-window.component';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  idleState = 'Not started.';

  constructor(private idle: Idle, private authenticationService: AuthenticationService, public dialog: MatDialog) {
    this.idle.setIdle(175);
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      //Time out
      this.idleState = 'Timed out!';
      this.dialog.open(DialogWindowComponent);
      this.logOut();
    });
    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
  }

  logOut() {
    this.authenticationService.logout()
      .pipe(
        take(1)
      ).subscribe(() => {});
  }
  startIdle() {
    this.idle.watch();
    this.idleState = 'Started.';
  }
}

