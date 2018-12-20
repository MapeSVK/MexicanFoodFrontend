import {Component, OnInit} from '@angular/core';
import {SessionStorage,} from "ngx-store";
import {OrderLine} from "../shared/models/orderLine";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../shared/services/order.service";
import {Order} from "../shared/models/order";
import {MealService} from "../shared/services/meal.service";
import {Meal} from "../shared/models/meal";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  // form group containing inputs where customer must specify details about himself
  customerDetailsForm = new FormGroup({
    name: new FormControl(''),
    telephoneNumber: new FormControl(''),
    orderDate: new FormControl(''),
    comment: new FormControl('')
  });

  // expansion panel with forms is closed when page is loaded
  detailsOpenState: boolean = false;

  // sessionstorage used for saving ordered meals. "cart" is the name of session storage
  @SessionStorage({key: 'cart'}) orderLineMealsInCart: Array<OrderLine> = [];

  // pickUpDate is used in method save() and it is combination of the date taken from the datepicker (orderDate input)
  // and hours specified in input called orderHour
  private pickUpDate: Date;

  // min,max dates used for restriction of the dates customer can choose
  // year, month (January is 0), calendar day
  todayDate = new Date();
  minDate: Date; //min date in the picker - today
  maxDate: Date; //max date in the picker - specified bellow in ngOnInit()

  // fields for the hours and minutes selection
  selectedHourString: string; //parsing later in the save() method
  selectedMinuteString: string; //parsing later in the save() method
  hoursString: string[] = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
  minutesString: string[] = ["00", "15", "30", "45"];

  // array of meals just to get an image and meal title
  meals: Meal[] = [];

  constructor(private orderService: OrderService, private router: Router, private mealService: MealService) {
    this.getAllMeals();
  }

  ngOnInit() {
    this.redirectBackIfNoItemsInCart();

    this.maxDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth()); //init but the day is specified bellow
    this.maxDate.setDate(this.todayDate.getDate() + 14); // max 2 weeks from now

    this.minDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(),this.todayDate.getDate());
  }

  redirectBackIfNoItemsInCart() {
    if (this.orderLineMealsInCart.length === 0) {
      window.alert("You don't have anything in your cart. Let's add some delicious meal!")
      this.router.navigate(['/meals']);
    }


  }

  // getting all the meals just to get their pictures
  getAllMeals() {
    this.mealService.getAllMeals().subscribe( listOfMeals => {
      this.meals = listOfMeals;
    });
  }

  // when button is clicked, expansion panel will open
  openDetails() {
    this.detailsOpenState = !this.detailsOpenState
  }

  // deletes orderLineMeal from the array on specified index
  deleteOrderLineMealFromCart(orderLineMeal: OrderLine) {
    const index = this.orderLineMealsInCart.indexOf(orderLineMeal);
    this.orderLineMealsInCart.splice(index,1);
    (<any>this.orderLineMealsInCart).save();

    //if the user deletes item and there is no more meals left then redirect him
    this.redirectBackIfNoItemsInCart();
  }

  removeEverythingFromCart() {
    this.orderLineMealsInCart = [];
    (<any>this.orderLineMealsInCart).save();
  }

  // total price of everything in the cart
  get totalPrice() {
    return this.orderLineMealsInCart.reduce((sum,x)=>
        ({quantity:1,
          priceWhenBought:sum.priceWhenBought+x.quantity*x.priceWhenBought}),
      {quantity:1,priceWhenBought:0}).priceWhenBought;
  }

  // used when customer decides to change quantity.
  // meal with old value of quantity will be changed for "new" meal with the new value of quantity
  decreaseQuantity(orderLineMeal: OrderLine) {
    if (orderLineMeal.quantity > 1) {
      orderLineMeal.quantity--;
      const index = this.orderLineMealsInCart.indexOf(orderLineMeal);
      this.orderLineMealsInCart[index] = orderLineMeal;
      (<any>this.orderLineMealsInCart).save();
    }
    else {
      window.alert("Amount of meals cannot be lower than 1.");
    }
  }

  // used when customer decides to change quantity.
  // meal with old value of quantity will be changed for "new" meal with the new value of quantity
  increaseQuantity(orderLineMeal: OrderLine) {
    if (orderLineMeal.quantity < 30) {
      orderLineMeal.quantity++;
      const index = this.orderLineMealsInCart.indexOf(orderLineMeal);
      this.orderLineMealsInCart[index] = orderLineMeal;
      (<any>this.orderLineMealsInCart).save();
    }
    else {
      window.alert("Please contact us via phone or email to arrange order with more than 30 meals.");
    }

  }

  getMealPicture(orderLineMeal: OrderLine): string {
    for (let meal of this.meals) {
      if (meal.id === orderLineMeal.mealId) {
        return meal.picture;
      }
    }
  }

  getMealName(orderLineMeal: OrderLine): string {
    for (let meal of this.meals) {
      if (meal.id === orderLineMeal.mealId) {
          return meal.name;
      }
    }
  }

  save() {
    var newOrder = new Order();

      // mobile no., cust. name, comment taken from the form inputs
      newOrder.mobilenumber = this.customerDetailsForm.get('telephoneNumber').value;
      newOrder.customerName = this.customerDetailsForm.get('name').value;
      newOrder.comment = this.customerDetailsForm.get('comment').value;

      // pickUpDate is a combination of the date specified in datepicker, and hours + minutes speicifed in "select" bars
      this.pickUpDate = new Date(this.customerDetailsForm.get('orderDate').value);
      this.pickUpDate.setHours(parseInt(this.selectedHourString), parseInt(this.selectedMinuteString)); //setting hours and minutes - parsed from the string field
      newOrder.pickUpDateAndTime = this.pickUpDate; //adding this field to the order property

      // today date
      newOrder.orderedDateAndTime = new Date();
      //orderLines taken from the session storage
      newOrder.orderLines = this.orderLineMealsInCart;

      //total price calculated: priceWhenBought * quantity
      newOrder.totalPrice = this.totalPrice;

      console.log(newOrder);
      this.orderService.createOrder(newOrder);
      // this.removeEverythingFromCart();
  }
}
