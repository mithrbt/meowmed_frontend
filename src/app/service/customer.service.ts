import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "http://localhost:8080/api";
  customer: any = {};

  constructor(private httpClient: HttpClient) {
  }

  getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.baseURL + `/kunden`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.baseURL + `/kunden`, customer);
  }

  deleteCustomer(id: number): Observable<Object> {
    return this.httpClient.delete(this.baseURL + `/kunden/${id}`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.baseURL + `/kunden/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Object> {
    return this.httpClient.put(this.baseURL + `/kunden/${id}`, customer);
  }
}
