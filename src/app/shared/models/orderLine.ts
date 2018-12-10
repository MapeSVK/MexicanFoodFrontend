import {Meal} from "./meal";
import {Order} from "./order";

export class OrderLine {
  mealId: number;
  meal: Meal;

  orderId: number;
  order: Order;

  quantity: number;
}
