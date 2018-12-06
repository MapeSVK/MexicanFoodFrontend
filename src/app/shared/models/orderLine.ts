import {Meal} from './meal';

export class OrderLine {
  mealId?: number;
  meal?: Meal;
  orderId: number;
  quantity: number;
  priceWhenBought: number;
}
