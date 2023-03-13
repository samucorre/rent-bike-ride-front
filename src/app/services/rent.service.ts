import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse, RESTResponse } from '../model/rest/response';
import { Rent } from '../model/rent';
import { CreateRentRequest, EditRentRequest } from '../model/rest/request';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) { }

  public getRents(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Rent[]>> {
    const url = API_CONFIG.getRents;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<DataSourceRESTResponse<Rent[]>>(url, pageFilter, { headers });
  }

  public getRent(id: number): Observable<RESTResponse<Rent>> {
    const url = API_CONFIG.getRent;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<RESTResponse<Rent>>(url, { params, headers });
  }

  public createRent(rent: Rent): Observable<RESTResponse<number>> {
    const url = API_CONFIG.createRents;
    const body: CreateRentRequest = new CreateRentRequest(rent);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public editRent(rent: Rent): Observable<RESTResponse<number>> {
    const url = API_CONFIG.editRents;
    const body: EditRentRequest = new EditRentRequest(rent);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public deleteRent(id: number): Observable<RESTResponse<number>> {
    const url = API_CONFIG.deleteRents;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<RESTResponse<number>>(url, { params, headers });
  }
}
