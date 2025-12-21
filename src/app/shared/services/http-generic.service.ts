import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class HttpGenericService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(apiUrl + url, { params, headers })
      .pipe(catchError(this.errorHandler));
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(apiUrl + url, body, { headers })
      .pipe(catchError(this.errorHandler));
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(apiUrl + url, body, { headers })
      .pipe(catchError(this.errorHandler));
  }

  delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(apiUrl + url, { params, headers })
      .pipe(catchError(this.errorHandler));
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(apiUrl + url, body, { headers })
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
