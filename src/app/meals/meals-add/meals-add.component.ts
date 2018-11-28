import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meals-add',
  templateUrl: './meals-add.component.html',
  styleUrls: ['./meals-add.component.css']
})
export class MealsAddComponent implements OnInit {
  mealForm = new FormGroup({
    name: new FormControl(''),
    ingredients: new FormControl(''),
    description: new FormControl(''),
    picture: new FormControl(''),
    price: new FormControl('')
  });
  constructor(private mealService: MealService, private router: Router) { }

  ngOnInit() {
  }
  save() {
    const mealFromFields = this.mealForm.value;
    this.mealService.createMeal(mealFromFields).subscribe( () => {
      this.router.navigateByUrl('/meals');
    });
  }

}
