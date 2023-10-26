import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "http://localhost:8080/api/kunden";
  customer: any = {};
  constructor(private httpClient: HttpClient) { }

  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.baseURL);
  }

  createCustomer(customer: Customer): Observable<Object>{
    return this.httpClient.post(this.baseURL, customer);
  }

  deleteCustomer(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  readCustomer(id: number): Observable<Object>{
    return this.httpClient.read(`${this.baseURL}/${id}`);
  }
}
