import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { PersonaService } from '../../../shared/services/persona.service';
import { PersonaModel } from '../../../shared/models/persona.model';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {

  @Input() modo: 'asesor' | 'cliente' = 'cliente';
  @Input() idPersona: number | null = null;

  personaForm!: FormGroup;
  loading = false;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      Nombres: ['', Validators.required],
      Paterno: ['', Validators.required],
      Materno: [''],
      Correo: ['', [Validators.required, Validators.email]],
      Telefono: ['', Validators.required]
    });

    // Si hay id, cargar para edición
    if (this.idPersona) {
      this.cargarPersona();
    }
  }

  // ============================================
  // 🔹 Cargar persona (modo edición)
  // ============================================
  cargarPersona() {
    this.loading = true;

    this.personaService.getPersonaById(this.idPersona!).subscribe({
      next: (res: PersonaModel) => {
        this.personaForm.patchValue(res);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la información';
        this.loading = false;
      }
    });
  }

  // ============================================
  // 🔹 Guardar (Crear o Editar Persona)
  // ============================================
  enviar() {
    if (this.personaForm.invalid) {
      this.personaForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.mensaje = '';

    const user = this.auth.getUser();

    const payload: PersonaModel = {
      ...this.personaForm.value,
      TipoPersona: user?.rol === 'Administrador' ? 1 : 2
    };

    // Si hay ID → editar
    if (this.idPersona) {
      this.editarPersona(payload);
    } 
    // Si no hay ID → nuevo registro
    else {
      this.crearPersona(payload);
    }
  }

  // ============================================
  // ✏️ EDITAR
  // ============================================
  private editarPersona(payload: PersonaModel) {
    const data: PersonaModel = {
      ...payload,
      idPersona: this.idPersona!
    };

    this.personaService.updatePersona(data).subscribe({
      next: () => {
        this.loading = false;
        this.mensaje = 'Actualizado correctamente';
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al actualizar';
      }
    });
  }

  // ============================================
  // ➕ CREAR
  // ============================================
  private crearPersona(payload: PersonaModel) {
    this.personaService.createPersona(payload).subscribe({
      next: () => {
        this.loading = false;
        this.mensaje = 'Registrado correctamente';
        this.personaForm.reset();
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al registrar';
      }
    });
  }
}
