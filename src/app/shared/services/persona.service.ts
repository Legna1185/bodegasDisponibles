import { Injectable } from '@angular/core';
import { HttpGenericService } from './http-generic.service';
import { Observable } from 'rxjs';
import { PersonaModel } from '../models/persona.model';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpGenericService,
    private auth: AuthService
  ) {}

  // =========================
  // 🔐 GENERAR HEADERS CON TOKEN
  // =========================
  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // =========================
  // 📌 GET: obtener lista de personas
  // =========================
  getPersonas(): Observable<PersonaModel[]> {
    return this.http.get<PersonaModel[]>(
      '/persona/listar',
      undefined,
      this.getAuthHeaders()
    );
  }

  // =========================
  // 📌 GET por ID
  // =========================
  getPersonaById(id: number): Observable<PersonaModel> {
    return this.http.get<PersonaModel>(
      `/persona/${id}`,
      undefined,
      this.getAuthHeaders()
    );
  }

  // =========================
  // 📌 POST: crear persona
  // =========================
  createPersona(persona: PersonaModel): Observable<any> {
    return this.http.post<any>(
      '/persona',
      persona,
      this.getAuthHeaders()
    );
  }

  // =========================
  // 📌 PUT: actualizar persona
  // =========================
  updatePersona(persona: PersonaModel): Observable<any> {
    return this.http.put<any>(
      '/persona/actualizar',
      persona,
      this.getAuthHeaders()
    );
  }

  // =========================
  // ❌ DELETE: eliminar persona
  // =========================
  deletePersona(id: number): Observable<any> {
    return this.http.delete<any>(
      `persona/eliminar/${id}`,
      undefined,
      this.getAuthHeaders()
    );
  }
}
