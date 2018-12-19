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
  meals: Meal[] = [];
  subscription: Subscription;
  loggedIn: boolean;

  constructor(private mealService: MealService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.refresh();
    this.subscription = this.authenticationService.isLoggedIn
      .subscribe(logg => {
        this.loggedIn = logg;
      },
        error => {
          console.log(error.message);
        });
  }
  refresh() {
    this.loading = false;
    this.mealService.getAllMeals().subscribe( listOfMeals => {
      this.meals = listOfMeals;
      this.loading = true;
      this.disableAddButtonIfMealExistsInCart();
    });
  }

  delete(id: number) {
    this.mealService.deleteMeal(id).subscribe(() => {
      this.refresh();
    },
      error => {
        console.log(error.message);
      });
  }

  //session storage saves array of order lines
  addToSessionStorage(mealId: number, mealPrice: number, meal: Meal) {
    var orderLineMeal = new OrderLine();
    orderLineMeal.mealId = mealId;
    orderLineMeal.priceWhenBought = mealPrice;
    orderLineMeal.quantity = 1; //set quantity to 1, then disable the button for adding to the cart. Quantity can be then changed in checkout page
    this.orderLineMealsInCart.push(orderLineMeal);

    // change isDisable property in Meal object to true and this affects button in HTML which is then disabled and user cannot click on the same button again
    meal.isDisabled = true;
  }

  /* when is called: when adding data to the meals[] array is finished after taking this data from the service - refresh() method
   * what it does: it will compare array of all meals[] with array of orderLines taken from the sessionStorage
   * and if particular meal already exists in both of them it will change the property isDisabled to 'true' and this disables button 'att to cart'
   */
  disableAddButtonIfMealExistsInCart() {
    for (let meal of this.meals){
      for (let orderLine of this.orderLineMealsInCart) {
        if (meal.id === orderLine.mealId) {
          meal.isDisabled = true;
        }
      }
    }
  }

}
