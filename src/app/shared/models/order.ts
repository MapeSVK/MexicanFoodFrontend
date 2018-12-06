import {OrderLine} from './orderLine';

export class Order {
  id?: number;
  mobilenumber: string;
  customerName: string;
  pickUpDate?: Date;
  orderDate?: Date;
  comment: string;
  orderLines?: OrderLine[];
}
