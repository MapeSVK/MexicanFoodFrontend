import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {MealsListComponent} from './meals/meals-list/meals-list.component';
import {MealsAddComponent} from './meals/meals-add/meals-add.component';
import {MealsUpdateComponent} from './meals/meals-update/meals-update.component';
import {LoginComponent} from './login/login.component';
import {isCanActivate} from '@angular/router/src/utils/type_guards';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'meals', component: MealsListComponent, canActivate: [AuthGuard]},
  {path: 'meals-add', component: MealsAddComponent},
  {path: 'meals-update/:id', component: MealsUpdateComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
