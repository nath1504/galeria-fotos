import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Foto } from '../../models/foto';

@Component({
  selector: 'app-galeria-fotos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-fotos.html',
  styleUrl: './galeria-fotos.css'
})
export class GaleriaFotos {

  @Input() fotos: Foto[] = [];

  @Output() fotoSeleccionada = new EventEmitter<Foto>();

  seleccionar(foto: Foto): void {
    this.fotoSeleccionada.emit(foto);
  }

}