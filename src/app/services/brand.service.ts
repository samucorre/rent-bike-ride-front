import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse, RESTResponse } from '../model/rest/response';
import { Brand } from '../model/brand';
import { CreateBrandRequest, EditBrandRequest } from '../model/rest/request';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  public getBrands(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Brand[]>> {
    const url = API_CONFIG.getBrands;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<DataSourceRESTResponse<Brand[]>>(url, pageFilter, { headers });
  }

  public getBrand(id: number): Observable<RESTResponse<Brand>> {
    const url = API_CONFIG.getBrand;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<RESTResponse<Brand>>(url, { params, headers });
  }

  public createBrand(brand: Brand): Observable<RESTResponse<number>> {
    const url = API_CONFIG.createBrands;
    const body: CreateBrandRequest = new CreateBrandRequest(brand);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public editBrand(brand: Brand): Observable<RESTResponse<number>> {
    const url = API_CONFIG.editBrands;
    const body: EditBrandRequest = new EditBrandRequest(brand);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public deleteBrand(id: number): Observable<RESTResponse<number>> {
    const url = API_CONFIG.deleteBrands;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<RESTResponse<number>>(url, { params, headers });
  }
}
