import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {Meal} from '../../shared/models/meal';
import {SessionStorage} from "ngx-store";
import {OrderLine} from "../../shared/models/orderLine";

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
  //disableButton; // will disable button "add to cart" after it was clicked

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.refresh();
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
    orderLineMeal.quantity = 1; //set quantity to 1, then disable button for adding to the cart and then quantity can be changed in checkout-page

    this.orderLineMealsInCart.push(orderLineMeal);
    //this.disableButton(meal);
  }

  /*disableButton(meal: Meal): boolean {
    return true;
  }*/


}
