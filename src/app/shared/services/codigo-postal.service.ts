import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CodigoPostalResponse } from '../models/codigo-postal-response.model';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  private baseUrl = `${environment.API_URL}/codigopostal`;

  constructor(private http: HttpClient) {}

  /**
   * 🔍 Buscar Estado y Municipio por Código Postal
   * @param codigoPostal string (5 dígitos)
   */
  buscarPorCodigoPostal(codigoPostal: string): Observable<CodigoPostalResponse> {
    return this.http.get<CodigoPostalResponse>(
      `${this.baseUrl}/${codigoPostal}`
    );
  }
}
