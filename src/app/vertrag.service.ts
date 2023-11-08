import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Vertrag} from "./vertrag";
import {Cat} from "./cat";

@Injectable({
  providedIn: 'root'
})
export class VertragService {

  private baseURL = "http://localhost:8080/api";
  customer: any = {};
  constructor(private httpClient: HttpClient) { }

  getVertragList(id: number): Observable<Vertrag[]>{
    return this.httpClient.get<Vertrag[]>(this.baseURL + `/kunden/${id}/vertrag`);
  }

  createVertrag(id: number, vertrag: Vertrag): Observable<Vertrag>{
      return this.httpClient.post<Vertrag>(this.baseURL + `/kunden/${id}/vertrag`, vertrag);
  }

  deleteVertrag(id: number): Observable<Object>{
    return this.httpClient.delete(this.baseURL + `/vertrag/${id}`);
  }

  getCatByContractId(id: number): Observable<Cat> {
    return this.httpClient.get<Cat>(this.baseURL + `/vertrag/${id}/katze`);
  }

  getVertragById(id: number): Observable<Vertrag>{
    return this.httpClient.get<Vertrag>(this.baseURL + `/vertrag/${id}`);
  }

  updateVertrag(id: number, vertrag: Vertrag): Observable<Object>{
    return this.httpClient.put(this.baseURL + `/vertrag/${id}`, vertrag);
  }


}
