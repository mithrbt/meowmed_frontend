import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Vertrag} from "./vertrag";

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

  createVertrag(vertrag: Vertrag, id: number): Observable<Object>{
      return this.httpClient.post(this.baseURL + `/kunden/${id}/vertrag`, vertrag);
  }

  deleteVertrag(id: number): Observable<Object>{
    return this.httpClient.delete(this.baseURL + `/vertrag/${id}`);
  }

  getVertragById(id: number): Observable<Vertrag>{
    return this.httpClient.get<Vertrag>(this.baseURL + `/vertrag/${id}`);
  }

  updateVertrag(id: number, vertrag: Vertrag): Observable<Object>{
    return this.httpClient.put(this.baseURL + `/vertrag/${id}`, vertrag);
  }


}
