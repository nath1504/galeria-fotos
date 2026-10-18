
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foto } from '../models/foto';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private readonly apiUrl = 'http://localhost:3000/api/fotos';

  constructor(private http: HttpClient) {}

  obtenerFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.apiUrl);
  }

  subirFoto(datos: FormData): Observable<Foto> {
    return this.http.post<Foto>(this.apiUrl, datos);
  }
}
