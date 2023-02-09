import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG} from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse, RESTResponse } from '../model/rest/response';
import { Model } from '../model/model';
import { CreateModelRequest, EditModelRequest } from '../model/rest/request';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  public getModels(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Model[]>> {
    const url = API_CONFIG.getModels;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<DataSourceRESTResponse<Model[]>>(url, pageFilter, { headers });
  }

  public getModel(id: number): Observable<RESTResponse<Model>> {
    const url = API_CONFIG.getModel;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<RESTResponse<Model>>(url, { params, headers });
  }

  public createModel(model: Model): Observable<RESTResponse<number>> {
    const url = API_CONFIG.createModels;
    const body: CreateModelRequest = new CreateModelRequest(model);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public editModel(model: Model): Observable<RESTResponse<number>> {
    const url = API_CONFIG.editModels;
    const body: EditModelRequest = new EditModelRequest(model);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    return this.http.post<RESTResponse<number>>(url, body, { headers });
  }

  public deleteModel(id: number): Observable<RESTResponse<number>> {
    const url = API_CONFIG.deleteModels;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<RESTResponse<number>>(url, { params, headers });
  }
}
