import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselFeatureComponent } from './carousel-feature/carousel-feature.component';
import { MaterialModule } from '../shared/material/material.module';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component'; // opcional, si usas botones mat-icon

@NgModule({
  declarations: [CarouselFeatureComponent, LoginDialogComponent, PersonaFormComponent, AlertDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CarouselFeatureComponent,PersonaFormComponent]
})
export class SharedModule {}
