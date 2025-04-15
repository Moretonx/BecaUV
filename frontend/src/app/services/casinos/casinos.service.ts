import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Casino[]>(this.url_api);
  }

  addCasino(casino: Casino) {
    return this.http.post(this.url_api, casino);
  }

  updateCasino(casino: Casino) {
    return this.http.put(`${this.url_api}/${casino.id}`, casino);
  }

  deleteCasino(id: string) {
    return this.http.delete(`${this.url_api}/${id}`);
  }
  
}