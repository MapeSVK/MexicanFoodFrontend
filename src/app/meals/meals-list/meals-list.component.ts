import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {

  constructor(private mealService : MealService) { }

  ngOnInit() {
  }

}
