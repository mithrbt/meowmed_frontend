import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Breed} from "./breed";

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private baseURL = "http://localhost:8080/api";
  breed: any = {};
  constructor(private httpClient: HttpClient) { }

  getAllBreeds(): Observable<Breed[]>{
    return this.httpClient.get<Breed[]>(this.baseURL + `/katze/rassen`);
  }
}



