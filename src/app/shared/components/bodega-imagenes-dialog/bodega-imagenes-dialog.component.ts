import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bodega-imagenes-dialog',
  templateUrl: './bodega-imagenes-dialog.component.html',
  styleUrls: ['./bodega-imagenes-dialog.component.css']
})
export class BodegaImagenesDialogComponent {

  imagenes: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      idBodega?: number;
      imagenes?: string[];
    },
    private dialogRef: MatDialogRef<BodegaImagenesDialogComponent>
  ) {
    // Copia las imágenes existentes (si hay)
    if (data?.imagenes) {
      this.imagenes = [...data.imagenes];
    }
  }

  // =========================
  // Seleccionar imágenes
  // =========================
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);

    // Validar máximo 5 imágenes
    if (this.imagenes.length + files.length > 5) {
      alert('Máximo 5 imágenes por bodega');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenes.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    // Limpia el input para poder volver a seleccionar
    input.value = '';
  }

  // =========================
  // Eliminar imagen
  // =========================
  eliminarImagen(index: number): void {
    this.imagenes.splice(index, 1);
  }

  // =========================
  // Guardar (retorna imágenes)
  // =========================
  guardar(): void {
    this.dialogRef.close(this.imagenes);
  }

  // =========================
  // Cancelar
  // =========================
  cancelar(): void {
    this.dialogRef.close();
  }
}
