import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {Meal} from '../../shared/models/meal';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {
  loading: boolean;
  meals: Meal[];
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
}
