import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { PersonaModel } from '../../../../shared/models/persona.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  usuarios: PersonaModel[] = [];
  loading = true;

  constructor(
    private personaService: PersonaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;

    this.personaService.getPersonas().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error cargando usuarios:", err);
        this.loading = false;
      }
    });
  }

  nuevo() {
    this.router.navigate(['/app/admin/usuarios/nuevo']);
  }

  editar(id: number) {
    this.router.navigate([`/app/admin/usuarios/editar/${id}`]);
  }
}
