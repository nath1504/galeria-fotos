
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Foto } from '../../models/foto';

@Component({
  selector: 'app-galeria-fotos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-fotos.html',
  styleUrl: './galeria-fotos.css'
})
export class GaleriaFotos implements OnChanges {
  @Input() fotos: Foto[] = [];

  @Output() fotoSeleccionada = new EventEmitter<Foto>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fotos']) {
      console.log('Fotografías recibidas:', this.fotos);
    }
  }

  obtenerUrl(foto: Foto): string {
    const direccion = foto.url || foto.ruta || '';

    if (!direccion) {
      return '';
    }

    if (/^https?:\/\//i.test(direccion)) {
      return direccion;
    }

    return `http://localhost:3000${direccion.startsWith('/') ? '' : '/'}${direccion}`;
  }

  imagenError(event: Event, foto: Foto): void {
    const imagen = event.target as HTMLImageElement;

    console.error('Error al cargar fotografía:', {
      titulo: foto.titulo,
      direccion: imagen.src
    });
  }

  seleccionar(foto: Foto): void {
    this.fotoSeleccionada.emit(foto);
  }
}
