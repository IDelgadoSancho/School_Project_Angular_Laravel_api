import { Injectable } from '@angular/core';
import { IDirector } from '../interfaces/idirector';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesDirectorsService {

  constructor(private _http: HttpClient) { }

  public getDades(): Observable<HttpResponse<IDirector[]>> {
    return this._http.get<IDirector[]>('/api/directors', { observe: 'response' });
    //get retorna un observable
  }

  public createDirector(dada: any) {
    return this._http.post<IDirector[]>('/api/director', dada, { observe: 'response' });
  }

  public getDirector(id: any): Observable<HttpResponse<IDirector>> {
    return this._http.get<IDirector>(`/api/directors/${id}`, { observe: 'response' });
    //get retorna un observable
  }

  /**
   * getDirector(id: any)
   */
  public editDirector(id: any, dada: any) {
    return this._http.post<IDirector>(`/api/director/${id}`,dada, { observe: 'response' });
  }

  /**
   * deleteDirector(id:any)
   */
  public deleteDirector(id: any) {
    return this._http.delete<IDirector>(`/api/director/${id}`, { observe: 'response' });
  }
}
