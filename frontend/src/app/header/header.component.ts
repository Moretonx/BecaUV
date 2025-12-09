import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loading = false;
  year: number = new Date().getFullYear();   // << Año dinámico para footer

  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {}

  logout() {
    this.loading = true;

    // Limpia sesión
    localStorage.removeItem('token_login');
    localStorage.removeItem('role');

    // Espera solo para mostrar spinner
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/login']);
    }, 800);
  }
}
