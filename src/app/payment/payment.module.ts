import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PaymentService} from "../shared/services/payment.service";
import {MakePaymentComponent} from "../make-payment/make-payment.component";


@NgModule({
  declarations: [
    MakePaymentComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
