import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse, RESTResponse } from '../model/rest/response';
import { Bike } from '../model/bike';
import { CreateBikeRequest, EditBikeRequest } from '../model/rest/request';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  public getBikes(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Bike[]>> {
    const url = API_CONFIG.getBikes;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<DataSourceRESTResponse<Bike[]>>(url, pageFilter, { headers });
  }

  public getBike(id: number): Observable<RESTResponse<Bike>> {
    const url = API_CONFIG.getBike;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<RESTResponse<Bike>>(url, { params, headers });
  }

  public createBike(bike: Bike): Observable<RESTResponse<number>> {
    const url = API_CONFIG.createBikes;
    const body: CreateBikeRequest = new CreateBikeRequest(bike);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public editBike(bike: Bike): Observable<RESTResponse<number>> {
    const url = API_CONFIG.editBikes;
    const body: EditBikeRequest = new EditBikeRequest(bike);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public deleteBike(id: number): Observable<RESTResponse<number>> {
    const url = API_CONFIG.deleteBikes;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<RESTResponse<number>>(url, { params, headers });
  }
}
