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

  createCustomer() {
    this.httpClient.post(this.baseURL, this.customer)
        .subscribe((response) => {
          console.log('Kunde erstellt:', response);
          // Hier können Sie eine Weiterleitung oder andere Aktionen hinzufügen
        });

  }
}
