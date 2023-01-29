import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FiltroBusquedaComponent } from './shared/filtro-busqueda/filtro-busqueda.component';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { TablaVideojuegosComponent } from './tasks/tabla-videojuegos/tabla-videojuegos.component';
import { RouterModule } from '@angular/router';
import { TablaUsuariosComponent } from './users/tabla-usuarios/tabla-usuarios.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FiltroBusquedaComponent,
    TablaVideojuegosComponent,
    TablaUsuariosComponent,
  ],
  exports: [
    HeaderComponent,
    FiltroBusquedaComponent,
    TablaVideojuegosComponent,
    TablaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
