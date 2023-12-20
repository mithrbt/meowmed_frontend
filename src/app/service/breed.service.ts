import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Breed} from "../model/breed";

@Injectable({
  providedIn: 'root'
})

export class BreedService {

  private baseURL = "http://localhost:8080/api";
  cat: any = {};

  constructor(private httpClient: HttpClient) {
  }

  getBreedById(rassenName: string): Observable<Breed> {
    return this.httpClient.get<Breed>(this.baseURL + `/rassen/${rassenName}`);
  }

  getAllBreeds(): Observable<Breed[]> {
    return this.httpClient.get<Breed[]>(this.baseURL + `/katze/rassen`);
  }
}
