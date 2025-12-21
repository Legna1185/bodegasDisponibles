import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'db3_token';
  private userKey = 'db3_user';

  private currentUserSubject = new BehaviorSubject<any | null>(null);
  usuario$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem(this.userKey);
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // ====================================
  // 🔐 LOGIN al backend
  // ====================================
  login(correo: string, contrasena: string) {
    const url = `${environment.API_URL}/usuario/login`;

    return this.http.post<any>(url, {
      Correo: correo,
      Contrasena: contrasena
    }).pipe(
      tap(res => {
        if (res.success) {

          // Guardar token
          if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }

          // Guardar usuario (estructura EXACTA)
          if (res.usuario) {
            const userData = {
              displayName: res.usuario.displayName ?? '',
              rol: res.usuario.rol ?? '',
              correo: correo
            };

            localStorage.setItem(this.userKey, JSON.stringify(userData));
            this.currentUserSubject.next(userData);
          }
        }
      })
    );
  }

  // ====================================
  // 👤 Obtener usuario actual
  // ====================================
  getUser() {
    return this.currentUserSubject.value ||
           JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }

  // ====================================
  // 🔑 Obtener token
  // ====================================
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ====================================
  // 🚪 Logout
  // ====================================
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  // ====================================
  // ✔️ Sesión activa
  // ====================================
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
