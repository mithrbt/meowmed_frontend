import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Vertrag} from "./vertrag";

@Injectable({
  providedIn: 'root'
})
export class VertragService {

  private baseURL = "http://localhost:8080/api/vertrag";
  customer: any = {};
  constructor(private httpClient: HttpClient) { }

  getVertragList(): Observable<Vertrag[]>{
    return this.httpClient.get<Vertrag[]>(this.baseURL);
  }

  createVertrag(vertrag: Vertrag): Observable<Object>{
    vertrag.beitrag = (vertrag.farbe=="schwarz") ? (vertrag.deckungssummer *0.2) : (vertrag.deckungssummer *0.15);
      return this.httpClient.post(this.baseURL, vertrag);
  }

  deleteVertrag(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getVertragById(id: number): Observable<Vertrag>{
    return this.httpClient.get<Vertrag>(`${this.baseURL}/${id}`);
  }

  updateVertrag(id: number, vertrag: Vertrag): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, vertrag);
  }


}
