import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cat} from "./cat";
import {Breed} from "./breed";

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private baseURL = "http://localhost:8080/api";
  cat: any = {};
  constructor(private httpClient: HttpClient) { }

  createCat(customerID: number, contractID: number, cat: Cat): Observable<Cat>{
    return this.httpClient.post<Cat>(this.baseURL + `/kunden/${customerID}/vertrag/${contractID}/katze`, cat);
  }

  getCatList(id: number): Observable<Cat[]>{
    return this.httpClient.get<Cat[]>(this.baseURL + `/kunden/${id}/katze`);
  }

  getCatById(id: number): Observable<Cat>{
    return this.httpClient.get<Cat>(this.baseURL + `/katze/${id}`);
  }

  updateCat(id:number, cat: Cat): Observable<Cat>{
    return this.httpClient.put<Cat>(this.baseURL + `/katze/${id}`, cat);
  }

  deleteCat(id: number): Observable<Object>{
    return this.httpClient.delete(this.baseURL + `/cat/${id}`);
  }

  deleteCatByContractID(contractID: number): Observable<Object>{
    return this.httpClient.delete(this.baseURL + `/katze/${contractID}`);
  }

  deleteByCustomerID(customerID: number): Observable<Object>{
    return this.httpClient.delete(this.baseURL + `/kunde/${customerID}/katzen`)
  }

}
