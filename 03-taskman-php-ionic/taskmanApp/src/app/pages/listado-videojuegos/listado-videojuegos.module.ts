import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoVideojuegosPageRoutingModule } from './listado-videojuegos-routing.module';

import { ListadoVideojuegosPage } from './listado-videojuegos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoVideojuegosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoVideojuegosPage]
})
export class ListadoVideojuegosPageModule {}
