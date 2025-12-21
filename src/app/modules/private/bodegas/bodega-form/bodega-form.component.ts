import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BodegasService } from '../../../../core/services/bodegas.service';
import { Bodega } from '../../../../core/models/bodega.model';

@Component({
  selector: 'app-bodega-form',
  templateUrl: './bodega-form.component.html',
  styleUrls: ['./bodega-form.component.css']
})
export class BodegaFormComponent implements OnInit {
  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    ubicacion: ['', Validators.required],
    superficieM2: [0, [Validators.required, Validators.min(1)]],
    precioMensual: [0, [Validators.required, Validators.min(0)]],
    disponible: [true]
  });

  constructor(
    private fb: FormBuilder,
    private api: BodegasService,
    private dialogRef: MatDialogRef<BodegaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bodega | null
  ) {}

  ngOnInit(): void {
    if (this.data) this.form.patchValue(this.data);
  }

  save(): void {
    const value = this.form.value as Bodega;
    if (this.data && this.data.id) {
      this.api.update(this.data.id, value).subscribe(() => this.dialogRef.close(true));
    } else {
      this.api.create(value).subscribe(() => this.dialogRef.close(true));
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
