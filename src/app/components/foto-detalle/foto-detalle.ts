import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Foto } from '../../models/foto';

@Component({
  selector: 'app-foto-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foto-detalle.html',
  styleUrl: './foto-detalle.css'
})
export class FotoDetalle {

  @Input() foto?: Foto;

}