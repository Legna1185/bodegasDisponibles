import { Component, OnInit } from '@angular/core';
import { Filtro } from '../../../models/filtro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filtros: Filtro[] = [];
  filtrosSeleccionados: any = {}; // 🔹 Aquí guardaremos los valores seleccionados
  mostrar: boolean = false; 
  ngOnInit() {
    // 🔹 Aquí podrías cargarlos de un servicio o archivo JSON externo
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
  }

  applyFilters()
  {
    console.log(this.getFiltrosSeleccionadosJSON());
    alert("siempre confie en mi")
  }

  // 🔹 Método que se ejecuta al seleccionar un filtro
  onFilterChange(filtro: Filtro, itemValue: string, event: any) {
    if (filtro.Tipo === 'checkbox') {
      // Inicializa el array si no existe
      if (!this.filtrosSeleccionados[filtro.Title]) {
        this.filtrosSeleccionados[filtro.Title] = [];
      }

      if (event.target.checked) {
        this.filtrosSeleccionados[filtro.Title].push(itemValue);
      } else {
        // Quitar el valor si se desmarca
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
  // 🔹 Método para obtener el JSON final (por ejemplo, al presionar "Aplicar filtros")
  getFiltrosSeleccionadosJSON() {
    return JSON.stringify(this.filtrosSeleccionados, null, 2);
  }
}
