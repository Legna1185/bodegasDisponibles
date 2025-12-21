import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegasListComponent } from './bodegas-list.component';

describe('BodegasListComponent', () => {
  let component: BodegasListComponent;
  let fixture: ComponentFixture<BodegasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
