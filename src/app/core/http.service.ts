import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API_BASE_URL, StorageKeys } from '@shared/modules';

export enum AUTH_TYPE {
  USER,
  API_TOKEN,
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  get<T>(
    route: string,
    authType: AUTH_TYPE = AUTH_TYPE.API_TOKEN
  ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${route}`, {
      headers:
        authType === AUTH_TYPE.API_TOKEN
          ? this._getHeadersApiToken()
          : this._getHeadersWithUser(),
    });
  }

  create<TData>(route: string, data: TData): Observable<TData>;
  create<TData, TReturn>(route: string, data: TData): Observable<TReturn>;
  create(route: string, data: unknown) {
    return this.http.post(`${this.baseUrl}${route}`, data, {
      headers: this._getHeadersApiToken(),
    });
  }

  private update<TData>(route: string, data: TData): Observable<TData>;
  private update<TData, TReturn>(
    route: string,
    data: TData
  ): Observable<TReturn>;
  private update(route: string, data: unknown) {
    return this.http.put(`${this.baseUrl}${route}`, data);
  }

  private patch<TData>(route: string, data: TData): Observable<TData>;
  private patch<TData, TReturn>(
    route: string,
    data: TData
  ): Observable<TReturn>;
  private patch(route: string, data: unknown) {
    return this.http.patch(`${this.baseUrl}${route}`, data);
  }

  private delete<T>(route: string, data?: unknown): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${route}`, {
      body: data,
      headers: this._getHeadersApiToken(),
    });
  }

  private _getHeadersApiToken(): HttpHeaders {
    const apiToken = localStorage.getItem(StorageKeys.API_TOKEN) ?? 'apitoken';

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('X-AUTH-TOKEN', apiToken);

    return headers;
  }

  private _getHeadersWithUser(): HttpHeaders {
    const login = localStorage.getItem(StorageKeys.USER_LOGIN) ?? 'doe';

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `Basic ${login}`);

    return headers;
  }
}