import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Foto } from '../../models/foto';

@Component({
  selector: 'app-carga-fotos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carga-fotos.html',
  styleUrl: './carga-fotos.css'
})
export class CargaFotos {

  @Output() agregar = new EventEmitter<Foto>();

  mostrarModal = false;

  nuevaFoto: Foto = {
    id: 0,
    titulo: '',
    descripcion: '',
    url: '',
    tipo: ''
  };

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardar() {

    this.nuevaFoto.id = Date.now();

    this.agregar.emit({ ...this.nuevaFoto });

    this.nuevaFoto = {
      id: 0,
      titulo: '',
      descripcion: '',
      url: '',
      tipo: ''
    };

    this.cerrarModal();

  }

}