import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaFotos } from './galeria-fotos';

describe('GaleriaFotos', () => {
  let component: GaleriaFotos;
  let fixture: ComponentFixture<GaleriaFotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaFotos],
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriaFotos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
