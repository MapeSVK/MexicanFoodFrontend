import { Component, OnInit } from '@angular/core';
import {SessionStorage} from "ngx-store";
import {Meal} from "../shared/models/meal";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  detailsOpenState: boolean = false;

  @SessionStorage({key: 'cart'}) mealsInCart: Array<Meal> = [];

  constructor() { }

  ngOnInit() {
  }

  openDetails() {
    this.detailsOpenState = !this.detailsOpenState
  }


}
