import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService  } from '../../shared/services/login.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    private loginService: LoginService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Getters para validación
  get usuario() { return this.loginForm.get('usuario'); }
  get password() { return this.loginForm.get('password'); }

  close() {
    this.dialogRef.close();
  }

  login() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const correo = this.loginForm.get('usuario')?.value!;
  const contrasena = this.loginForm.get('password')?.value!;

  this.auth.login(correo, contrasena).subscribe({
    next: (resp) => {
      console.log("Respuesta login:", resp);

      if (resp.success) {
        // Ya se guardó el usuario en el AuthService (tap)
        this.dialogRef.close();
        this.router.navigate(['/app/bodegas']);
      } else {
        alert("Correo o contraseña incorrectos");
      }
    },
    error: (error) => {
      console.error("Error en login:", error);
      alert("Error al intentar iniciar sesión");
    }
  });
}
}

