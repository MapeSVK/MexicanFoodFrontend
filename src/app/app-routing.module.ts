import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {MealsListComponent} from './meals/meals-list/meals-list.component';
import {MealsAddComponent} from './meals/meals-add/meals-add.component';
import {MealsUpdateComponent} from './meals/meals-update/meals-update.component';

const routes: Routes = [
  { path: ''
    , component: WelcomeComponent},
  {path: 'meals'
    , component: MealsListComponent},
  {path: 'meals-add'
    , component: MealsAddComponent},
  {path: 'meals-update/:id'
    , component: MealsUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
