import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carousel-feature',
  templateUrl: './app-carousel-feature.component.html',
  styleUrls: ['./app-carousel-feature.component.css']
})
export class CarouselFeatureComponent {

  @Input() title!: string;
  @Input() images: string[] = [];
  @Input() features: string[] = [];

  // 👉 NUEVO
  @Output() verDetalle = new EventEmitter<void>();

  imagenActual = 0;

  next(): void {
    if (this.images.length === 0) return;
    this.imagenActual = (this.imagenActual + 1) % this.images.length;
  }

  prev(): void {
    if (this.images.length === 0) return;
    this.imagenActual =
      (this.imagenActual - 1 + this.images.length) % this.images.length;
  }

  // 👉 NUEVO
  onVerDetalle(): void {
    this.verDetalle.emit();
  }
}
