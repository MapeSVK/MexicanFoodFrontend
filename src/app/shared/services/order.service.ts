import { Injectable } from '@angular/core';
import {Observable, pipe, Subscription} from 'rxjs';
import {Order} from '../models/order';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {catchError} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'https://mexicanfooddeveloper.azurewebsites.net/api/orders';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getAllOrders(): Observable<Order[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.get<Order[]>(this.apiUrl, httpOptions);
  }

  getOrderById(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.get(this.apiUrl + '/' + id, httpOptions);
  }

  deleteOrder(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.delete(this.apiUrl + '/' + id, httpOptions);
  }

  responseStatus: number;

  createOrder(newOrder: Order): Subscription {
    return this.http.post<Order>(this.apiUrl, newOrder, {observe: 'response'}).subscribe(response => {

      // You can access status:
      console.log(response.status);

    });

  }
}
