import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { PersonaModel } from 'src/app/shared/models/persona.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  form!: FormGroup;
  idPersona: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();          // ✅ 1. primero el form
    this.leerIdYcargar();   
    
    console.log('ID:', this.idPersona);// ✅ 2. luego el ID
    
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: [''],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      idTipoPersona: [1]
    });
  }

  leerIdYcargar(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.idPersona = Number(id);
        this.cargarPersona(this.idPersona);
      }
    });
  }

  cargarPersona(id: number): void {
    this.loading = true;

    this.personaService.getPersonaById(id).subscribe({
      next: (persona: PersonaModel) => {
        this.form.patchValue(persona);   // ✅ aquí se llena
        this.loading = false;
        console.log('Persona API:', persona);
      },
      error: err => {
        console.error('Error cargando persona', err);
        this.loading = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const persona: PersonaModel = {
      ...this.form.value,
      idPersona: this.idPersona ?? 0
    };

    const request$ = this.idPersona
      ? this.personaService.updatePersona(persona)
      : this.personaService.createPersona(persona);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/app/admin/usuarios']);
      },
      error: err => console.error(err)
    });
  }

  onGuardado(): void {
  this.router.navigate(['/app/admin/usuarios']);
}
}
