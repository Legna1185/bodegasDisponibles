import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpGenericService } from './http-generic.service';
import { Bodega } from '../../core/models/bodega.model';
import { AuthService } from './auth.service';
import { BodegaListado } from '../models/bodega-listado.model';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {

  constructor(
    private http: HttpGenericService,
    private auth: AuthService
  ) {}

  // =========================
  // 🔐 Headers con token
  // =========================
  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // =========================
  // 📌 GET: listar bodegas
  // =========================
  getAll(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(
      '/bodegas',
      undefined,
      this.getAuthHeaders()
    );
  }

  // =========================
  // 📌 GET: obtener bodega por ID
  // =========================
  getById(id: number): Observable<Bodega> {
    return this.http.get<Bodega>(
      `/bodegas/${id}`,
      undefined,
      this.getAuthHeaders()
    );
  }

  // =========================
  // ➕ POST: crear bodega
  // =========================
  create(data: Bodega): Observable<any> {
    return this.http.post<any>(
      '/bodegas',
      data,
      this.getAuthHeaders()
    );
  }

  // =========================
  // ✏️ PUT: actualizar bodega
  // =========================
  update(id: number, data: Bodega): Observable<any> {
    return this.http.put<any>(
      `/bodegas/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  // =========================
  // ❌ DELETE: eliminar bodega
  // =========================
  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      `/bodegas/${id}`,
      undefined,
      this.getAuthHeaders()
    );
  }

  

getListado(): Observable<BodegaListado[]> {
  return this.http.get<BodegaListado[]>(
    '/bodegas/listado',
    undefined,
    this.getAuthHeaders()
  );
}

}
