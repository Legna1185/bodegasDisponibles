import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BodegasService } from '../../../../core/services/bodegas.service';
import { CodigoPostalService } from '../../../../shared/services/codigo-postal.service';
import { CodigoPostalResponse } from '../../../../shared/models/codigo-postal-response.model';
import { MatDialog } from '@angular/material/dialog';
import { BodegaImagenesDialogComponent } from '../../../../shared/components/bodega-imagenes-dialog/bodega-imagenes-dialog.component';


@Component({
  selector: 'app-bodega-form',
  templateUrl: './bodega-form.component.html',
  styleUrls: ['./bodega-form.component.css']
})
export class BodegaFormComponent implements OnInit {

  form!: FormGroup;
  idBodega: number | null = null;

  // =========================
  // Imágenes (DEMO)
  // =========================
  imagenes: string[] = [];
  imagenActual = 0;
/*
  imagenes = [
  'https://via.placeholder.com/800x400?text=Bodega+1',
  'https://via.placeholder.com/800x400?text=Bodega+2'
];*/
  constructor(
    private fb: FormBuilder,
    private api: BodegasService,
    private cpService: CodigoPostalService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idBodega = id ? Number(id) : null;

    if (this.idBodega) {
      this.cargarBodega(this.idBodega);
    }
  }

  // =========================
  // Crear formulario
  // =========================
  private crearFormulario(): void {
    this.form = this.fb.group({
      Alias: [''],
      TipoInmueble: ['Bodega'],
      idOperacion: [1],
      idEstadoPropiedad: [1],

      Precio: [null],
      Costo_Mantenimiento: [null],

      M2_Terreno: [0],
      M2_Construccion: [0],
      Frente: [0],
      Fondo: [0],
      Altura_Max: [0],
      Altura_Min: [0],
      Niveles: [1],

      Cajones_Estacionamiento: [0],
      Andenes: [0],
      Cortinas: [0],
      Rampas: [0],
      Capacidad_Transformador: [0],
      Resistencia: [0],

      Alarma: [false],
      Banos: [false],
      Minisplit: [false],
      Iluminacion: [false],
      Luz: [false],
      Agua: [false],
      Gas: [false],
      Internet: [false],
      Cisterna: [false],
      Hidratante: [false],
      Extractores: [false],
      Caseta_Vigilancia: [false],
      Acceso_Plano: [false],
      Acceso_Rampa: [false],

      Uso_Suelo: ['Industrial'],
      Estado_Fisico: [''],
      Descripcion: [''],

      Direccion: this.fb.group({
        c_CodigoPostal: [''],
        Estado: [''],
        Municipio: [''],
        Colonia: [''],
        Calle: [''],
        NoInterior: [''],
        NoExterior: [''],
        Referencia: ['']
      })
    });
  }

  // =========================
  // Cargar bodega (editar)
  // =========================
  private cargarBodega(id: number): void {
    this.api.getById(id).subscribe(res => {
      if (!res) return;
      this.form.patchValue(res);
    });
  }

  // =========================
  // Guardar
  // =========================
  save(): void {
    if (this.form.invalid) return;

    const raw = this.form.value;

    const payload = {
      ...raw,
      Alarma: raw.Alarma ? 1 : 0,
      Banos: raw.Banos ? 1 : 0,
      Minisplit: raw.Minisplit ? 1 : 0,
      Iluminacion: raw.Iluminacion ? 1 : 0,
      Luz: raw.Luz ? 1 : 0,
      Agua: raw.Agua ? 1 : 0,
      Gas: raw.Gas ? 1 : 0,
      Internet: raw.Internet ? 1 : 0,
      Cisterna: raw.Cisterna ? 1 : 0,
      Hidratante: raw.Hidratante ? 1 : 0,
      Extractores: raw.Extractores ? 1 : 0,
      Caseta_Vigilancia: raw.Caseta_Vigilancia ? 1 : 0,
      Acceso_Plano: raw.Acceso_Plano ? 1 : 0,
      Acceso_Rampa: raw.Acceso_Rampa ? 1 : 0
    };

    if (this.idBodega) {
      this.api.update(this.idBodega, payload)
        .subscribe(() => this.router.navigate(['/app/admin/bodegas']));
    } else {
      this.api.create(payload)
        .subscribe(() => this.router.navigate(['/app/admin/bodegas']));
    }
  }

  // =========================
  // Cancelar
  // =========================
  cancel(): void {
    this.router.navigate(['/app/admin/bodegas']);
  }

  // =========================
  // Código Postal → Estado / Municipio
  // =========================
  onCodigoPostalChange(): void {
    const direccionGroup = this.form.get('Direccion') as FormGroup;
    const cp = direccionGroup.get('c_CodigoPostal')?.value;

    if (!cp || cp.length !== 5) {
      direccionGroup.patchValue({
        Estado: '',
        Municipio: ''
      });
      return;
    }

    this.cpService.buscarPorCodigoPostal(cp).subscribe({
      next: (res: CodigoPostalResponse) => {
        if (res.success) {
          direccionGroup.patchValue({
            Estado: res.data.Estado,
            Municipio: res.data.Municipio
          });
        } else {
          direccionGroup.patchValue({
            Estado: '',
            Municipio: ''
          });
        }
      },
      error: () => {
        direccionGroup.patchValue({
          Estado: '',
          Municipio: ''
        });
      }
    });
  }

  // =========================
  // IMÁGENES (DEMO)
  // =========================
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);

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

    input.value = '';
  }

  nextImage(): void {
    if (this.imagenes.length === 0) return;
    this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
  }

  prevImage(): void {
    if (this.imagenes.length === 0) return;
    this.imagenActual =
      (this.imagenActual - 1 + this.imagenes.length) % this.imagenes.length;
  }

  abrirModalImagenes(): void {
  const dialogRef = this.dialog.open(BodegaImagenesDialogComponent, {
    width: '600px',
    data: {
      idBodega: this.idBodega,
      imagenes: this.imagenes
    }
  });

  dialogRef.afterClosed().subscribe((result: string[] | undefined) => {
    if (result) {
      this.imagenes = result;
      this.imagenActual = 0;
    }
  });
}

}
