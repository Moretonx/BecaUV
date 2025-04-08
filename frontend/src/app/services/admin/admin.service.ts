// src/app/services/admin/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  url_api = `${environment.backend}/api/admin`;

  selectUser: User = {
    id: 0,  // Inicializamos con 0 en lugar de string vacío
    usuario: '',
    password: '',
    role: 'Usuario',
    casino: '' // Mantenemos este campo para la compatibilidad con el frontend
  };

  getUser(): Observable<User[]> {
    console.log('Solicitando usuarios desde:', this.url_api);
    return this.http.get<User[]>(this.url_api);
  }

  addUser(user: any): Observable<any> {
    console.log('Enviando datos de usuario al servidor:', user);
    return this.http.post(this.url_api, user);
  }

  deleteUser(id: string | number): Observable<any> {
    console.log(`Enviando solicitud DELETE a: ${this.url_api}/${id}`);
    return this.http.delete(`${this.url_api}/${id}`).pipe(
      tap(
        response => console.log('Respuesta exitosa de eliminación:', response),
        error => console.error('Error en eliminación:', error)
      )
    );
  }
}