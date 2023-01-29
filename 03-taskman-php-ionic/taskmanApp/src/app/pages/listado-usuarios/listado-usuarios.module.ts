import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoUsuariosPageRoutingModule } from './listado-usuarios-routing.module';

import { ListadoUsuariosPage } from './listado-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoUsuariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoUsuariosPage]
})
export class ListadoUsuariosPageModule {}
