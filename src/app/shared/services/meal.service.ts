import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Meal} from '../models/meal';
import {Observable} from 'rxjs';

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
  constructor(private http: HttpClient) { }
  getAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }
  createMeal(newMeal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, newMeal);
  }
  getMealById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }
  updateMeal(id: number, meal: Meal): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, meal);
  }
  deleteMeal(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  } 

}
