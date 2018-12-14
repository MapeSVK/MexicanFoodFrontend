import { Component, OnInit } from '@angular/core';
import {SessionStorage, SessionStorageService} from "ngx-store";
import {Meal} from "../shared/models/meal";
import {OrderLine} from "../shared/models/orderLine";
import {FormControl, FormGroup} from "@angular/forms";
import {MealService} from "../shared/services/meal.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/services/order.service";
import {Order} from "../shared/models/order";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  customerDetailsForm = new FormGroup({
    name: new FormControl(''),
    telephoneNumber: new FormControl(''),
    orderDate: new FormControl(''),
    comment: new FormControl('')
  });

  detailsOpenState: boolean = false;

  @SessionStorage({key: 'cart'}) orderLineMealsInCart: Array<OrderLine> = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    var date = new Date();
    console.log(date);


    //this.datepicker();

  }

  /*datepicker() {
    var input = document.getElementById('input');
    var picker = new Picker(input, {
      format: 'YYYY/MM/DD HH:mm',
    });
  }*/

  openDetails() {
    this.detailsOpenState = !this.detailsOpenState
  }


  changeOrderLineMeal(orderLineMeal: OrderLine) {
    const index = this.orderLineMealsInCart.indexOf(orderLineMeal);
    this.orderLineMealsInCart[index] = orderLineMeal;
    (<any>this.orderLineMealsInCart).save();
  }

  deleteOrderLineMealFromCart(orderLineMeal: OrderLine) {
    const index = this.orderLineMealsInCart.indexOf(orderLineMeal);
    this.orderLineMealsInCart.splice(index,1);
    (<any>this.orderLineMealsInCart).save();
  }

  removeEverythingFromCart() {
    this.orderLineMealsInCart = [];
    (<any>this.orderLineMealsInCart).save();
  }

  save() {
    const customerDetailsForm = this.customerDetailsForm.value;
    var newOrder = new Order();
      newOrder.mobilenumber = this.customerDetailsForm.get('telephoneNumber').value;
      newOrder.customerName = this.customerDetailsForm.get('name').value;
      newOrder.comment = this.customerDetailsForm.get('comment').value;
      newOrder.orderDate = new Date();
      newOrder.pickUpDate = new Date();
      newOrder.orderLines = this.orderLineMealsInCart;

    this.orderService.createOrder(newOrder);
  }
}
