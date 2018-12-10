import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {MealsListComponent} from './meals/meals-list/meals-list.component';
import {MealsAddComponent} from './meals/meals-add/meals-add.component';
import {MealsUpdateComponent} from './meals/meals-update/meals-update.component';
import {LoginComponent} from './login/login.component';
import {OrderListComponent} from './orders/order-list/order-list.component';
import {AboutUsComponent} from './about-us/about-us.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {path: 'meals', component: MealsListComponent},
  {path: 'meals-add', component: MealsAddComponent},
  {path: 'meals-update/:id', component: MealsUpdateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
