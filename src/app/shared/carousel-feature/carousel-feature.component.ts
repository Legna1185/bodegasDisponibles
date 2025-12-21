import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-feature',
  templateUrl: './carousel-feature.component.html',
  styleUrls: ['./carousel-feature.component.css']
})
export class CarouselFeatureComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() images: string[] = [];
  @Input() features: string[] = [];
  @Input() interval: number = 3000; // 🔹 tiempo entre slides (ms)

  currentIndex = 0;
  private timer: any;
  isPaused = false;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  prevSlide(): void {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextSlide(): void {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  startAutoSlide(): void {
    this.clearTimer();
    this.timer = setInterval(() => {
      if (!this.isPaused) this.nextSlide();
    }, this.interval);
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
