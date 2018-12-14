import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {Meal} from '../../shared/models/meal';
import {SessionStorage} from "ngx-store";
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {
  @SessionStorage({key: 'cart'}) mealsInCart: Array<Meal> = [];

  loading: boolean;
  meals: Meal[];
  subscription: Subscription;
  loggedIn: boolean;
  idleState = 'Not started.';
  constructor(private mealService: MealService, private authenticationService: AuthenticationService,
              private idle: Idle, private keepalive: Keepalive) { }
  ngOnInit() {
    this.refresh();
    this.createIdle();
    this.subscription = this.authenticationService.isLoggedIn
      .subscribe(logg => {
        this.loggedIn = logg;
      });
  }
  createIdle() {
    this.idle.setIdle(80);
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
    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
  }
  refresh() {
    this.loading = false;
    this.mealService.getAllMeals().subscribe( listOfMeals => {
      this.meals = listOfMeals;
      this.loading = true;
    });
  }
  delete(id: number) {
    this.mealService.deleteMeal(id).subscribe(() => {
      this.refresh();
    });
  }

  addToSessionStorage(meal: Meal) {
    this.mealsInCart.push(meal);
    //this.disableButton(meal);
  }
  /*disableButton(meal: Meal): boolean {
    return true;
  }*/
}
