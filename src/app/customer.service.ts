import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "http://localhost:8080/api/kunden";

  constructor(private httpClient: HttpClient) { }

  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.baseURL);
  }

  setCustomer(){
    return this.httpClient.post(this.baseURL,Customer).subscribe((response) => {
      console.log('Produkt erstellt:', response);
    });

  }
}
