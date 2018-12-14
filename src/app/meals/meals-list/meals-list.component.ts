import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {Meal} from '../../shared/models/meal';
import {SessionStorage} from 'ngx-store';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {IdleService} from '../../shared/services/idle.service';

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
  constructor(private mealService: MealService, private authenticationService: AuthenticationService, private idle: IdleService) { }
  ngOnInit() {
    this.refresh();
    this.idle.startIdle();
  //disableButton; // will disable button "add to cart" after it was clicked
    this.subscription = this.authenticationService.isLoggedIn
      .subscribe(logg => {
        this.loggedIn = logg;
      });
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
