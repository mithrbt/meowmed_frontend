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

  createVertrag(id: number, cat: Cat): Observable<Object>{
    console.log(id);
    return this.httpClient.post(this.baseURL + `/vertrag/${id}/katze`, cat);
  }

  getCatList(id: number): Observable<Cat[]>{
    return this.httpClient.get<Cat[]>(this.baseURL + `/vertrag/${id}/katze`);
  }
}
