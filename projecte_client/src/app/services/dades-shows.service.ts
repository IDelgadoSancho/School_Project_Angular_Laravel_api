import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IShow } from '../interfaces/ishow';

@Injectable({
  providedIn: 'root'
})
export class DadesShowsService {

  constructor(private _http: HttpClient) { }

  public getDades(): Observable<HttpResponse<IShow[]>> {
    return this._http.get<IShow[]>('/api/shows', { observe: 'response' });
    //get retorna un observable
  }

  /**
     * name
     */
  public createShow(dada: any) {
    return this._http.post<IShow[]>('/api/show', dada, { observe: 'response' });
  }

  public getShow(id: any): Observable<HttpResponse<IShow>> {
    return this._http.get<IShow>(`/api/shows/${id}`, { observe: 'response' });
    //get retorna un observable
  }

  /**
   * getShow(id: any)
   */
  public editShow(id: any, dada: any) {
    return this._http.put<IShow>(`/api/show/${id}`, dada, { observe: 'response' });
  }

  /**
   * deleteShow(id:any)
   */
  public deleteShow(id: any) {
    return this._http.delete<IShow>(`/api/show/${id}`, { observe: 'response' });
  }
}
