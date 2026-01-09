import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { BodegasListComponent } from './bodegas/bodegas-list/bodegas-list.component';
import { BodegaFormComponent } from './bodegas/bodega-form/bodega-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
declarations: [BodegasListComponent, BodegaFormComponent, AdminLayoutComponent, UsuariosListComponent, UsuarioFormComponent],
imports: [CommonModule, PrivateRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,SharedModule,MatTabsModule,MatSlideToggleModule ]
})
export class PrivateModule {}