import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { PersonaModel } from '../../../../shared/models/persona.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../../shared/dialogs/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  usuarios: PersonaModel[] = [];
  loading = false;

  constructor(
    private personaService: PersonaService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // ============================================
  // 📥 Cargar usuarios
  // ============================================
  cargarUsuarios(): void {
    this.loading = true;

    this.personaService.getPersonas().subscribe({
      next: (res: PersonaModel[]) => {
        this.usuarios = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        this.loading = false;
      }
    });
  }

  // ============================================
  // ➕ Nuevo
  // ============================================
  nuevo(): void {
    this.router.navigate(['/app/admin/usuarios/nuevo']);
  }

  // ============================================
  // ✏️ Editar
  // ============================================
  editar(id: number): void {
    this.router.navigate([`/app/admin/usuarios/editar/${id}`]);
  }

  // ============================================
  // ❌ Eliminar (confirmación)
  // ============================================
  eliminar(idPersona: number): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar asesor',
        message: '¿Está seguro de que desea eliminar este asesor?',
        confirmText: 'Sí',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.ejecutarEliminacion(idPersona);
      }
    });
  }

  // ============================================
  // 🗑️ Ejecutar eliminación
  // ============================================
  private ejecutarEliminacion(idPersona: number): void {
    this.loading = true;

    this.personaService.deletePersona(idPersona).subscribe({
      next: () => {
        this.cargarUsuarios(); // 🔄 refresca la tabla
      },
      error: (err) => {
        console.error('Error al eliminar persona', err);
        this.loading = false;
      }
    });
  }
}
