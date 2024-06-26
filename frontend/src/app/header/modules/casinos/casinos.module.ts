import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { CasinosRoutingModule } from './casinos-routing.module';
import { CasinosComponent } from './casinos.component';
import { VerCasinosComponent } from './components/ver-casinos/ver-casinos.component';
import { VerCasinosContainerComponent } from './containers/ver-casinos-container/ver-casinos-container.component';
import { VerCasinosScreenComponent } from './screens/ver-casinos-screen/ver-casinos-screen.component';
import { AgregarCasinosComponent } from './components/agregar-casinos/agregar-casinos.component';
import { AgregarCasinosContainerComponent } from './containers/agregar-casinos-container/agregar-casinos-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
/* import {  } from ''; */

@NgModule({
  declarations: [
    CasinosComponent,
    VerCasinosComponent,
    VerCasinosContainerComponent,
    VerCasinosScreenComponent,
    AgregarCasinosComponent,
    AgregarCasinosContainerComponent
  ],
  imports: [
    CommonModule,
    CasinosRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CasinosModule { }
