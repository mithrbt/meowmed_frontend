import { Injectable } from '@angular/core';
import {Vertrag} from "./vertrag";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cat} from "./cat";

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private baseURL = "http://localhost:8080/api";
  cat: any = {};
  constructor(private httpClient: HttpClient) { }

  createCat(contractID: number, cat: Cat): Observable<Object>{
    return this.httpClient.post(this.baseURL + `/vertrag/${contractID}/katze`, cat);
  }

  getCatList(id: number): Observable<Cat[]>{
    return this.httpClient.get<Cat[]>(this.baseURL + `/kunden/${id}/katze`);
  }

  getCatById(id: number): Observable<Cat>{
    return this.httpClient.get<Cat>(this.baseURL + `/katze/${id}`);
  }

}
