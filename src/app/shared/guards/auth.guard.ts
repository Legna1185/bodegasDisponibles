import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { LoginDialogComponent } from '../../shared/login-dialog/login-dialog.component';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const dialog = inject(MatDialog);
  const router = inject(Router);

  // Si ya está logueado → permitir
  if (auth.isLoggedIn()) {
    return true;
  }

  // Abrir automáticamente el modal de login
  dialog.open(LoginDialogComponent, {
    width: '400px',
    disableClose: true
  });

  // Denegar acceso hasta que el usuario se loguee
  return false;
};
