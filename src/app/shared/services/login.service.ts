import { Injectable } from '@angular/core';
import { HttpGenericService } from './http-generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpGenericService) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      correo: email,
      password: password
    };

    return this.http.post<any>('auth/login', body);
    // ⚠ Ajusta la ruta a como se maneje en tu API PHP
  }
}
