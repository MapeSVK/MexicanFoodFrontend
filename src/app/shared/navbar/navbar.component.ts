import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;
  loggedIn: boolean;


@Output()
contactClick = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.authenticationService.isLoggedIn
      .subscribe(logg => {
        this.loggedIn = logg;
      });
  }
logOut() {
  this.authenticationService.logout()
.pipe(
    take(1)
).subscribe(() => {
  this.loggedIn = false;
});
}

  scrollToFooter() {
   this.contactClick.emit();
  }
}
