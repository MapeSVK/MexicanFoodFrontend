import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MealsListComponent} from './meals/meals-list/meals-list.component';
import {MealsAddComponent} from './meals/meals-add/meals-add.component';
import {MealsUpdateComponent} from './meals/meals-update/meals-update.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FooterComponent} from './shared/footer/footer.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from './login/login.component';
import {MatFormField, MatFormFieldModule, MatInput, MatInputModule, MatSelectModule} from '@angular/material';
import {AuthenticationService} from './shared/services/authentication.service';
import {AuthGuard} from './guard/auth.guard';
import {MealService} from './shared/services/meal.service';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WebStorageModule } from 'ngx-store';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { NoAccessPageComponent } from './shared/no-access-page/no-access-page.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MealsListComponent,
    MealsAddComponent,
    MealsUpdateComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    OrderListComponent,
    AboutUsComponent,
    CheckoutPageComponent,
    NoAccessPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    WebStorageModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    MealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
