export class Meal {
  id?: number;
  name: string;
  ingredients: string;
  description: string;
  picture: string;
  price: number;

  // button for adding to the cart should be disabled if the meal was already added to the cart
  isDisabled: boolean = false;
}

