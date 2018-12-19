import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Meal} from '../models/meal';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MealService {

  apiUrl = 'https://mexicanfooddeveloper.azurewebsites.net/api/meals';
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  getAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }
  createMeal(newMeal: Meal): Observable<Meal> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.post<Meal>(this.apiUrl, newMeal, httpOptions);
  }
  getMealById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }
  updateMeal(id: number, meal: Meal): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.put(this.apiUrl + '/' + id, meal, httpOptions);
  }
  deleteMeal(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.delete(this.apiUrl + '/' + id, httpOptions);
  }
}
