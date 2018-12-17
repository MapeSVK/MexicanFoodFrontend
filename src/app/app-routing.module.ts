import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MealsListComponent} from './meals/meals-list/meals-list.component';
import {MealsAddComponent} from './meals/meals-add/meals-add.component';
import {MealsUpdateComponent} from './meals/meals-update/meals-update.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {OrderListComponent} from './orders/order-list/order-list.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {CheckoutPageComponent} from './checkout-page/checkout-page.component';
import {AdminGuard} from './guard/admin.guard';
import {NoAccessPageComponent} from './shared/no-access-page/no-access-page.component';

const routes: Routes = [
  {path: 'meals', component: MealsListComponent, canActivate: [AuthGuard]},
  {path: 'meals-add', component: MealsAddComponent, canActivate: [AdminGuard]},
  {path: 'meals-update/:id', component: MealsUpdateComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'orders', component: OrderListComponent, canActivate: [AdminGuard]},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'checkout', component: CheckoutPageComponent},
  {path: '404', component: NoAccessPageComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
