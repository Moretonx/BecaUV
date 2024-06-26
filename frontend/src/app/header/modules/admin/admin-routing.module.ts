import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { 
        path: 'admin', component: UsuariosComponent
      },
      {
        path: 'agregar-usuario', component: AgregarUsuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
