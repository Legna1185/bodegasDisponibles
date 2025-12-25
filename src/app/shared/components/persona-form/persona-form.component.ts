import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { PersonaService } from '../../../shared/services/persona.service';
import { PersonaModel } from '../../../shared/models/persona.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../shared/dialogs/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnChanges {

  @Input() modo: 'asesor' | 'cliente' = 'cliente';
  @Input() idPersona: number | null = null;

  // 🔔 Evento para avisar al padre
  @Output() guardado = new EventEmitter<void>();

  personaForm!: FormGroup;
  loading = false;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private personaService: PersonaService,
    private dialog: MatDialog
  ) {
    this.crearFormulario();
  }

  // ============================================
  // 🔄 Detecta cambios en el ID (edición)
  // ============================================
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idPersona'] && this.idPersona) {
      this.cargarPersona(this.idPersona);
    }
  }

  // ============================================
  // 🧱 Crear formulario (camelCase)
  // ============================================
  private crearFormulario(): void {
    this.personaForm = this.fb.group({
      nombres: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: [''],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      idTipoPersona: [1]
    });
  }

  // ============================================
  // 📥 Cargar persona por ID
  // ============================================
  private cargarPersona(id: number): void {
    this.loading = true;
    this.error = '';
    this.mensaje = '';

    this.personaService.getPersonaById(id).subscribe({
      next: (res: PersonaModel) => {
        this.personaForm.patchValue(res);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información';
        this.loading = false;
      }
    });
  }

  // ============================================
  // 💾 Guardar (crear o editar)
  // ============================================
  enviar(): void {
  if (this.personaForm.invalid) {
    this.personaForm.markAllAsTouched();
    return;
  }

  this.error = '';
  this.mensaje = '';

  const user = this.auth.getUser();

  const payload: PersonaModel = {
    ...this.personaForm.value,
    idTipoPersona: user?.rol === 'Administrador' ? 1 : 2
  };

  // ✏️ EDICIÓN → CONFIRMAR
  if (this.idPersona) {
    this.confirmarActualizacion(payload);
  }
  // ➕ CREACIÓN → DIRECTO
  else {
    this.loading = true;
    this.crearPersona(payload);
  }
}


  // ============================================
  // ✏️ Actualizar
  // ============================================
  private actualizarPersona(data: PersonaModel): void {
  this.loading = true;

  this.personaService.updatePersona(data).subscribe({
    next: () => {
      this.mensaje = 'Actualizado correctamente';
      this.loading = false;
      this.guardado.emit();
    },
    error: () => {
      this.error = 'Error al actualizar';
      this.loading = false;
    }
  });
}


  // ============================================
  // ➕ Crear
  // ============================================
  private crearPersona(data: PersonaModel): void {
    this.personaService.createPersona(data).subscribe({
      next: () => {
        this.mensaje = 'Registrado correctamente';
        this.loading = false;
        this.guardado.emit(); // 🚀 redirigir
      },
      error: () => {
        this.error = 'Error al registrar';
        this.loading = false;
      }
    });
  }

  private confirmarActualizacion(payload: PersonaModel): void {
  const dialogRef = this.dialog.open(AlertDialogComponent, {
    width: '400px',
    data: {
      title: 'Confirmar cambios',
      message: '¿Desea continuar con los cambios realizados?',
      confirmText: 'Sí',
      cancelText: 'No'
    }
  });

  dialogRef.afterClosed().subscribe((confirmado: boolean) => {
    if (confirmado) {
      this.actualizarPersona({
        ...payload,
        idPersona: this.idPersona!
      });
    }
    // ❌ Si es false → no hacemos nada
  });
}

}
