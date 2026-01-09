import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BodegasService } from '../../../../core/services/bodegas.service';
import { Bodega } from '../../../../core/models/bodega.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-bodegas-list',
  templateUrl: './bodegas-list.component.html',
  styleUrls: ['./bodegas-list.component.css']
})
export class BodegasListComponent implements OnInit {

  displayedColumns = [
    'id',
    'nombre',
    'ubicacion',
    'superficieM2',
    'precioMensual',
    'disponible',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Bodega>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: BodegasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  // =========================
  // 📥 Cargar bodegas
  // =========================
  load(): void {
    this.api.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // =========================
  // 🔍 Filtro
  // =========================
  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  // =========================
  // ➕ Nueva bodega
  // =========================
  newBodega(): void {
    this.router.navigate(['/app/admin/bodegas/nuevo']);
  }

  // =========================
  // ✏️ Editar bodega
  // =========================
  edit(bodega: Bodega): void {
    this.router.navigate(['/app/admin/bodegas/editar', bodega.id]);
  }
}
