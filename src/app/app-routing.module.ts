import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {MealsListComponent} from './meals/meals-list/meals-list.component';

const routes: Routes = [
  { path: ''
    , component: WelcomeComponent},
  {path: 'meals'
    , component: MealsListComponent},
  {path: 'meals-add'
    , component: MealsListComponent},
  {path: 'meals-update/:id'
    , component: MealsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
