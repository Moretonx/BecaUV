
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Actualiza la URL para incluir /api/
  private apiUrl = 'http://localhost:4000/api/login';

  constructor(private http: HttpClient) { }

  loginUser(credentials: {usuario: string, password: string}): Observable<any> {
    console.log('Enviando credenciales:', credentials);
    return this.http.post(this.apiUrl, credentials);
  }

  isLogged(): boolean {
    return localStorage.getItem('token_login') ? true : false;
  }

  rolesAccess(): boolean {
    let role = localStorage.getItem('role')?.trim();
    return role === 'Administrador';
  }
}