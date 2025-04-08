// src/app/services/casino/casino.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // <-- Ya no necesitamos HttpHeaders
import { Casino } from '../../models/casino';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasinoService {

  constructor(private http: HttpClient) { }

  url_api = environment.backend + '/api/casinos';  // <-- Asegúrate de que la ruta incluya /api/

  selectCasino: Casino = {
    nombre: '',
    cantidad: 0,
  };
  casinos!: Casino[];

  getCasinos() {
    return this.http.get<Casino[]>(this.url_api);  // <-- Ya no necesitamos pasar headers
  }

  addCasino(casino: Casino) {
    return this.http.post(this.url_api, casino);  // <-- Ya no necesitamos pasar headers
  }

  updateCasino(casino: Casino) {
    return this.http.put(`${this.url_api}/${casino.id}`, casino);  // <-- Ya no necesitamos pasar headers
  }

  deleteCasino(id: string) {
    return this.http.delete(`${this.url_api}/${id}`);  // <-- Ya no necesitamos pasar headers
  }
  
  // Eliminar el método createHeaders ya que no lo necesitamos más
}