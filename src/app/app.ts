import { Component } from '@angular/core';
import { Foto } from './models/foto';

import { GaleriaFotos } from './components/galeria-fotos/galeria-fotos';
import { FotoDetalle } from './components/foto-detalle/foto-detalle';
import { CargaFotos } from './components/carga-fotos/carga-fotos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GaleriaFotos,
    FotoDetalle,
    CargaFotos
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  titulo = 'Galería de Fotos';

  fotoSeleccionada?: Foto;

  fotos: Foto[] = [
    {
      id: 1,
      titulo: 'Montañas',
      descripcion: 'Hermoso paisaje montañoso.',
      url: 'https://picsum.photos/id/10/600/400',
      tipo: 'Naturaleza'
    },
    {
      id: 2,
      titulo: 'Ciudad',
      descripcion: 'Vista panorámica de una ciudad.',
      url: 'https://picsum.photos/id/1011/600/400',
      tipo: 'Ciudad'
    }
  ];

  seleccionarFoto(foto: Foto) {
    this.fotoSeleccionada = foto;
  }

  agregarFoto(foto: Foto) {
    this.fotos.push(foto);
  }

}