import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Order} from '../../shared/models/order';
import {Meal} from '../../shared/models/meal';
import {MealService} from '../../shared/services/meal.service';
import {max} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  loading: boolean;
  orders: Order[];
  meals: Meal[];
  constructor(private orderService: OrderService,
              private mealService: MealService) { }

  ngOnInit() {
    this.refreshOrders();
  }

  refreshOrders() {
    this.loading = false;
    this.orderService.getAllOrders().subscribe( listOfOrders => {
      this.orders = listOfOrders;
      this.loading = true;
    });
  }
  refreshMeals() {
    this.mealService.getAllMeals().subscribe(meals => {
      this.meals = meals;
    });
  }
}
