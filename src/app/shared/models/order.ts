import {OrderLine} from "./orderLine";

export class Order {
  id: number;
  mobileNumber: string;
  customerName: string;
  pickUpDateAndTime: Date;
  orderedDateAndTime: Date;
  comment: string;
  orderLines: OrderLine[];
}
