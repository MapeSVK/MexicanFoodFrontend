import {OrderLine} from './orderLine';

export class Order {
  id?: number;
  mobilenumber: string;
  customerName: string;
  pickUpDateAndTime?: Date;
  orderedDateAndTime?: Date;
  comment: string;
  orderLines?: OrderLine[];
  totalPrice:  number;
}
