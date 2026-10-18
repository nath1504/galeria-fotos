
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Foto } from './models/foto';
import { FotosService } from './services/fotos.service';

import { GaleriaFotos } from './components/galeria-fotos/galeria-fotos';
import { FotoDetalle } from './components/foto-detalle/foto-detalle';
import { CargaFotos } from './components/carga-fotos/carga-fotos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GaleriaFotos,
    FotoDetalle,
    CargaFotos
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  titulo = 'Galería de Fotos';
  fotoSeleccionada?: Foto;
  fotos: Foto[] = [];
  error = '';
  cargando = true;

  constructor(
    private fotosService: FotosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarFotos();
  }

  cargarFotos(): void {
    this.cargando = true;
    this.error = '';

    this.fotosService.obtenerFotos().subscribe({
      next: (fotos) => {
        this.fotos = fotos.map(foto => ({
          ...foto,
          url: foto.url ||
            (foto.ruta
              ? `http://localhost:3000${foto.ruta}`
              : ''),
          tipo: foto.tipo || 'General'
        }));

        console.log('Fotos cargadas en la galería:', this.fotos);

        this.cargando = false;

        // Solicitar a Angular que actualice la vista.
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar las fotos:', err);

        this.error =
          'No fue posible cargar las fotos. Verifica que el servidor esté funcionando.';

        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  seleccionarFoto(foto: Foto): void {
    this.fotoSeleccionada = foto;
    this.cdr.markForCheck();
  }

  agregarFoto(foto: Foto): void {
    this.fotos = [...this.fotos, foto];
    console.log('Foto agregada:', foto);
    this.cdr.markForCheck();
  }
}
