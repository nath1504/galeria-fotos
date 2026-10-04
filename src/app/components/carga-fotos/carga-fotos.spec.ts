import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaFotos } from './carga-fotos';

describe('CargaFotos', () => {
  let component: CargaFotos;
  let fixture: ComponentFixture<CargaFotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaFotos],
    }).compileComponents();

    fixture = TestBed.createComponent(CargaFotos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
