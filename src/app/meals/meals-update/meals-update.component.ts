import { Component, OnInit } from '@angular/core';
import {MealService} from '../../shared/services/meal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-meals-update',
  templateUrl: './meals-update.component.html',
  styleUrls: ['./meals-update.component.css']
})
export class MealsUpdateComponent implements OnInit {
  id: number;
  loading: boolean;
  mealForm = new FormGroup({
    name: new FormControl(''),
    ingredients: new FormControl(''),
    description: new FormControl(''),
    picture: new FormControl(''),
    price: new FormControl('')
  });
  constructor(private mealService: MealService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.mealService.getMealById(this.id).subscribe( meal => {
      this.loading = false;
      this.mealForm.patchValue({
        name: meal.name,
        ingredients: meal.ingredients,
        description: meal.description,
        picture: meal.picture,
        price: meal.price
      });
    });
  }
  save() {
    const updatedMeal = this.mealForm.value;
    updatedMeal.id = this.id;
    this.mealService.updateMeal(this.id, updatedMeal).subscribe( () => {
      this.router.navigateByUrl('/meals');
    });
  }
}
