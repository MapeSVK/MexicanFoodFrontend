import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {Meal} from '../../shared/models/meal';
import {SessionStorage} from "ngx-store";

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {
  @SessionStorage({key: 'cart'}) mealsInCart: Array<Meal> = [];

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

  addToSessionStorage(meal: Meal) {
    this.mealsInCart.push(meal);
    //this.disableButton(meal);
  }

  /*disableButton(meal: Meal): boolean {
    return true;
  }*/


}
