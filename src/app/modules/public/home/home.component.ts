import { Component, OnInit } from '@angular/core';
import { Filtro } from '../../../models/filtro';
import { BodegasService } from '../../../shared/services/bodegas.service';
import { BodegaListado } from '../../../shared/models/bodega-listado.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // =========================
  // Filtros (ya existentes)
  // =========================
  filtros: Filtro[] = [];
  filtrosSeleccionados: any = {};
  mostrar: boolean = false;

  // =========================
  // Bodegas (nuevo)
  // =========================
  bodegas: BodegaListado[] = [];
  loading: boolean = false;

  constructor(private bodegasService: BodegasService) {}

  ngOnInit(): void {

    // =========================
    // Inicializar filtros
    // =========================
    this.filtros = [
      {
        Title: 'Precio',
        Tipo: 'radio',
        Items: [
          { value: '$0 - $50' },
          { value: '$51 - $100' },
          { value: '$101 - $200' }
        ]
      },
      {
        Title: 'Ubicación',
        Tipo: 'checkbox',
        Items: [
          { value: 'Norte' },
          { value: 'Centro' },
          { value: 'Sur' }
        ]
      },
      {
        Title: 'Tipo',
        Tipo: 'radio',
        Items: [
          { value: 'Venta' },
          { value: 'Renta' }
        ]
      }
    ];

    // =========================
    // Cargar bodegas
    // =========================
    this.cargarBodegas();
  }

  // =========================
  // Obtener bodegas del API
  // =========================
  private cargarBodegas(): void {
    this.loading = true;

    this.bodegasService.getListado().subscribe({
      next: (res) => {
        this.bodegas = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando bodegas', err);
        this.loading = false;
      }
    });
  }

  // =========================
  // Aplicar filtros (demo)
  // =========================
  applyFilters(): void {
    console.log(this.getFiltrosSeleccionadosJSON());
    alert('Filtros aplicados (demo)');
  }

  // =========================
  // Manejo de filtros
  // =========================
  onFilterChange(filtro: Filtro, itemValue: string, event: any): void {
    if (filtro.Tipo === 'checkbox') {
      if (!this.filtrosSeleccionados[filtro.Title]) {
        this.filtrosSeleccionados[filtro.Title] = [];
      }

      if (event.target.checked) {
        this.filtrosSeleccionados[filtro.Title].push(itemValue);
      } else {
        const index = this.filtrosSeleccionados[filtro.Title].indexOf(itemValue);
        if (index > -1) {
          this.filtrosSeleccionados[filtro.Title].splice(index, 1);
        }
      }
    } else if (filtro.Tipo === 'radio') {
      this.filtrosSeleccionados[filtro.Title] = itemValue;
    }

    console.log('JSON actual de filtros:', this.filtrosSeleccionados);
  }

  getFiltrosSeleccionadosJSON(): string {
    return JSON.stringify(this.filtrosSeleccionados, null, 2);
  }

  // =========================
  // Helpers para el carousel
  // =========================
  getImages(bodega: BodegaListado): string[] {
    return bodega.Imagenes?.map(img => img.Url) || [];
  }

  getFeatures(bodega: BodegaListado): string[] {
    return [
      `Operación: ${bodega.operacion}`,
      `Precio: $${bodega.precio}`,
      bodega.direccion
    ];
  }
}
