import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from '../interfaces/ifilm';

@Injectable({
  providedIn: 'root'
})
export class DadesFilmsService {

  constructor(private _http: HttpClient) { }

  public getDades(): Observable<HttpResponse<IFilm[]>> {
    return this._http.get<IFilm[]>('/api/films', { observe: 'response' });
    //get retorna un observable
  }
  /**
   * name
   */
  public createFilm(dada: any) {
    return this._http.post<IFilm[]>('/api/film', dada, { observe: 'response' });
  }

  public getFilm(id: any): Observable<HttpResponse<IFilm>> {
    return this._http.get<IFilm>(`/api/films/${id}`, { observe: 'response' });
    //get retorna un observable
  }

  /**
   * getFilm(id: any)
   */
  public editFilm(id: any, dada: any) {
    return this._http.post<IFilm>(`/api/film/${id}`, dada, { observe: 'response' });
  }

  /**
   * deleteFilm(id:any)
   */
  public deleteFilm(id: any) {
    return this._http.delete<IFilm>(`/api/film/${id}`, { observe: 'response' });
  }
}
