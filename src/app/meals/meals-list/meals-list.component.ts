import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {Meal} from '../../shared/models/meal';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {IdleService} from '../../shared/services/idle.service';
import {SessionStorage} from "ngx-store";
import {OrderLine} from "../../shared/models/orderLine";
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {
  //session storage saves array of order lines
  @SessionStorage({key: 'cart'}) orderLineMealsInCart: Array<OrderLine> = [];

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

  //session storage saves array of order lines
  addToSessionStorage(mealId: number, mealPrice: number) {
    var orderLineMeal = new OrderLine();
    orderLineMeal.mealId = mealId;
    orderLineMeal.priceWhenBought = mealPrice;
    orderLineMeal.quantity = 1; //set quantity to 1, then disable the button for adding to the cart. Quantity can be then changed in checkout page

    this.orderLineMealsInCart.push(orderLineMeal);
    //this.disableButton(meal);
  }
  /*disableButton(meal: Meal): boolean {
    return true;
  }*/
}
