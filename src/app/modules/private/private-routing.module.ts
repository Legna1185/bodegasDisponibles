import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';

// Dashboards por rol
import { AdminDashboardComponent } from '../private/admin/admin-dashboard/admin-dashboard.component'
import { AsesorDashboardComponent } from '../private/asesor/asesor-dashboard/asesor-dashboard.component';

// Usuarios
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';

// Propiedades (Bodegas)
import { BodegasListComponent } from './bodegas/bodegas-list/bodegas-list.component';

// Redirección de rol
import { RoleRedirectComponent } from './role-redirect/role-redirect.component';
import { BodegaFormComponent } from './bodegas/bodega-form/bodega-form.component';

const routes: Routes = [

  // 👉 Esta ruta decide si el usuario es Admin o Asesor
  { path: '', component: RoleRedirectComponent },

  // ======================================================
  // 📌 RUTAS DEL ADMINISTRADOR
  // ======================================================
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // Usuarios
      { path: 'usuarios', component: UsuariosListComponent },
      { path: 'usuarios/nuevo', component: UsuarioFormComponent },
      { path: 'usuarios/editar/:id', component: UsuarioFormComponent },

      // Propiedades
      { path: 'bodegas', component: BodegasListComponent },
      { path: 'bodegas/nuevo', component: BodegaFormComponent },
      { path: 'bodegas/editar/:id', component: BodegaFormComponent },

      // Página default dentro del admin
      { path: '', redirectTo: 'bodegas', pathMatch: 'full' }
    ]
  },

  // ======================================================
  // 📌 RUTAS DEL ASESOR
  // ======================================================
  {
    path: 'asesor',
    component: AsesorDashboardComponent
  },

  // Fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}
