import {Component, EventEmitter, Input, OnInit, Output, IterableDiffers, DoCheck} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {MealService} from "../services/meal.service";
import {SessionStorage} from "ngx-store";
import {OrderLine} from "../models/orderLine";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  subscription: Subscription;
  loggedIn: boolean;
  itemsInCart: number;

  // using differ to track changes in orderLineMealsInCart array
  @Input() @SessionStorage({key: 'cart'}) orderLineMealsInCart: Array<OrderLine> = [];
  differ: any;

  @Output()
  contactClick = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, private mealService: MealService,differs: IterableDiffers) {
    this.differ = differs.find([]).create(null); //init of differ which tracks difference in component (in this case array of items)
  }

  ngDoCheck() {
    // checks if length of array has changed
    let changes = this.differ.diff(this.orderLineMealsInCart);
    // if this array changed, concretely its length, it will change the number of items in cart
    if (changes) {
      this.itemsInCart = this.orderLineMealsInCart.length;
    }
  }

  ngOnInit() {
    this.subscription = this.authenticationService.isLoggedIn
      .subscribe(logg => {
        this.loggedIn = logg;
      });

    /*this.observableArrayOfOrderLines = of(this.orderLineMealsInCart);
    this.observableArrayOfOrderLines.subscribe(result => {console.log(result.length)});*/
  }

logOut() {
  this.authenticationService.logout()
.pipe(
    take(1)
).subscribe(() => {
  this.loggedIn = false;
});
}

  scrollToFooter() {
   this.contactClick.emit();
  }
}
