import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginDialogComponent } from '../../../shared/login-dialog/login-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: string | null = null;

  constructor(private dialog: MatDialog, private auth: AuthService,private router: Router) {}

  ngOnInit(): void {
    // 🔹 Cargar usuario desde localStorage (por si se recargó la página)
    this.auth.getUser();
console.log(this.auth.usuario$);
    // 🔹 Suscribirse a los cambios de sesión
    this.auth.usuario$.subscribe(usuario => {
  this.usuario = usuario?.displayName || '';
});
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
