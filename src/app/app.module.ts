import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MealsListComponent } from './meals/meals-list/meals-list.component';
import { MealsAddComponent } from './meals/meals-add/meals-add.component';
import { MealsUpdateComponent } from './meals/meals-update/meals-update.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MealsListComponent,
    MealsAddComponent,
    MealsUpdateComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
