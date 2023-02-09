import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG} from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse, RESTResponse } from '../model/rest/response';
import { Size } from '../model/size';
import { CreateSizeRequest, EditSizeRequest } from '../model/rest/request';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  public getSizes(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Size[]>> {
    const url = API_CONFIG.getSizes;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<DataSourceRESTResponse<Size[]>>(url, pageFilter, { headers });
  }

  public getSize(id: number): Observable<RESTResponse<Size>> {
    const url = API_CONFIG.getSize;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<RESTResponse<Size>>(url, { params, headers });
  }

  public createSize(size: Size): Observable<RESTResponse<number>> {
    const url = API_CONFIG.createSizes;
    const body: CreateSizeRequest = new CreateSizeRequest(size);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public editSize(size: Size): Observable<RESTResponse<number>> {
    const url = API_CONFIG.editSizes;
    const body: EditSizeRequest = new EditSizeRequest(size);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public deleteSize(id: number): Observable<RESTResponse<number>> {
    const url = API_CONFIG.deleteSizes;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<RESTResponse<number>>(url, { params, headers });
  }
}
