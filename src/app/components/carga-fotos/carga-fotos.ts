
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Foto } from '../../models/foto';
import { FotosService } from '../../services/fotos.service';

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
  archivoSeleccionado: File | null = null;
  mensajeError = '';
  guardando = false;

  nuevaFoto = {
    titulo: '',
    descripcion: '',
    tipo: 'Otro'
  };

  constructor(private fotosService: FotosService) {}

  abrirModal(): void {
    this.mostrarModal = true;
    this.mensajeError = '';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.mensajeError = '';
  }

  seleccionarArchivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] || null;
    this.mensajeError = '';

    if (this.archivoSeleccionado &&
        !this.archivoSeleccionado.type.startsWith('image/')) {
      this.mensajeError = 'Selecciona un archivo de imagen válido.';
      this.archivoSeleccionado = null;
      input.value = '';
    } else if (this.archivoSeleccionado &&
               this.archivoSeleccionado.size > 5 * 1024 * 1024) {
      this.mensajeError = 'La imagen debe pesar menos de 5 MB.';
      this.archivoSeleccionado = null;
      input.value = '';
    }
  }

  guardar(): void {
    if (!this.nuevaFoto.titulo.trim()) {
      this.mensajeError = 'Escribe el título de la fotografía.';
      return;
    }

    if (!this.archivoSeleccionado) {
      this.mensajeError = 'Selecciona una fotografía de tu computadora.';
      return;
    }

    const datos = new FormData();
    datos.append('titulo', this.nuevaFoto.titulo.trim());
    datos.append('descripcion', this.nuevaFoto.descripcion);
    datos.append('tipo', this.nuevaFoto.tipo);
    datos.append('imagen', this.archivoSeleccionado);

    this.guardando = true;
    this.mensajeError = '';

    this.fotosService.subirFoto(datos).subscribe({
      next: (foto) => {
        this.agregar.emit(foto);
        this.nuevaFoto = {
          titulo: '',
          descripcion: '',
          tipo: 'Otro'
        };
        this.archivoSeleccionado = null;
        this.guardando = false;
        this.cerrarModal();
      },
      error: (error) => {
        this.guardando = false;
        this.mensajeError =
          error.error?.error || 'No se pudo subir la fotografía. Verifica el servidor.';
      }
    });
  }
}
