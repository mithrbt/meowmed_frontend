import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Form} from "@angular/forms";
import {Customer} from "./customer";
import {Image} from "./image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseURL = "http://localhost:8080/api";
  customer: any = {};
  constructor(private httpClient: HttpClient) { }

  public uploadFile(formData: FormData): Observable<any>{
    return this.httpClient.post(this.baseURL + `/upload/image`, formData);
  }

  public viewImage(name: any): Observable<any>{
    return this.httpClient.get(this.baseURL + `/get/image/info/${name}`)
  }
}
