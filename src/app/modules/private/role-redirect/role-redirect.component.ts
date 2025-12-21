import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-role-redirect',
  template: `<p>Redirigiendo...</p>`
})
export class RoleRedirectComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.auth.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.rol === 'Administrador') {
      this.router.navigate(['/app/admin']);
    } else if (user.rol === 'Asesor') {
      this.router.navigate(['/app/asesor']);
    } else {
      // Rol desconocido
      this.router.navigate(['/login']);
    }
  }
}
