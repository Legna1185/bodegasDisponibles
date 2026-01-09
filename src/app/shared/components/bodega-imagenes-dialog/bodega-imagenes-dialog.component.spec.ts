import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaImagenesDialogComponent } from './bodega-imagenes-dialog.component';

describe('BodegaImagenesDialogComponent', () => {
  let component: BodegaImagenesDialogComponent;
  let fixture: ComponentFixture<BodegaImagenesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaImagenesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegaImagenesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
