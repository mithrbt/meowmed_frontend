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

  public uploadFile(customerID: number,formData: FormData): Observable<any>{
    return this.httpClient.post(this.baseURL + `/${customerID}/upload/image`, formData);
  }

  public viewImage(customerID: number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/get/image/info/${customerID}`);
  }

  public deleteImage(customerId: number): Observable<any>{
    return this.httpClient.delete(this.baseURL + `/image/${customerId}`);
  }

  public uploadCatImage(catID: number, formData: FormData): Observable<any>{
    return this.httpClient.post(this.baseURL + `/${catID}/upload/catimage`, formData);
  }

  public viewCatImage(catID: number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/get/catImage/info/${catID}`);
  }

  public deleteCatImage(catID: number): Observable<any>{
    return this.httpClient.delete(this.baseURL + `/catImage/${catID}`);
  }
}
