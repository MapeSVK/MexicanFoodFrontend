import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'https://mexicanfooddeveloper.azurewebsites.net/api/orders';
  // apiUrl = 'https://localhost:5001/api/orders';

  constructor(private http: HttpClient) { }
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
  getOrderById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }
}
