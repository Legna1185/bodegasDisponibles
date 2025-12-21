import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BodegasService } from '../../../../core/services/bodegas.service';
import { Bodega } from '../../../../core/models/bodega.model';
import { BodegaFormComponent } from '../bodega-form/bodega-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-bodegas-list',
  templateUrl: './bodegas-list.component.html',
  styleUrls: ['./bodegas-list.component.css']
})
export class BodegasListComponent implements OnInit {
  displayedColumns = ['id','nombre','ubicacion','superficieM2','precioMensual','disponible','acciones'];
  dataSource = new MatTableDataSource<Bodega>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: BodegasService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getAll().subscribe(d => {
      this.dataSource.data = d;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  newBodega() {
    const dialogRef = this.dialog.open(BodegaFormComponent, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.load();
    });
  }

  edit(bodega: Bodega) {
    const dialogRef = this.dialog.open(BodegaFormComponent, {
      width: '500px',
      data: bodega
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.load();
    });
  }
}
