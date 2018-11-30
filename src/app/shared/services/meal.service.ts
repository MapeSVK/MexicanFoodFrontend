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
  getMealById(id: number): Observable<Meal> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }
  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.put<any>(this.apiUrl + '/' + id, meal);
  }
  deleteMeal(id: number): Observable<Meal> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
