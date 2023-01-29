import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerUsuarioPageRoutingModule } from './ver-usuario-routing.module';

import { VerUsuarioPage } from './ver-usuario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerUsuarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerUsuarioPage]
})
export class VerUsuarioPageModule {}
