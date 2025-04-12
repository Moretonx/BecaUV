import { inject } from "@angular/core";
import { Router } from "@angular/router";


export const permisosGuard = () => {
  const router = inject(Router);
  //Si está no está logueado, no permite el acceso a las rutas
  if (localStorage.getItem('token_login')) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }
};

export const permisosAdmin = () => {
  const router = inject(Router);
  //Si no es Administrador, no permite el acceso a ciertas rutas
  if (localStorage.getItem('role')?.trim() === 'Administrador') {
    return true;
  } else {
    router.navigate(['/'])
    return false;
  }
}