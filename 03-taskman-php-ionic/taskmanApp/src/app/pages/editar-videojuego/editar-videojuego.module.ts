import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarVideojuegoPageRoutingModule } from './editar-videojuego-routing.module';

import { EditarVideojuegoPage } from './editar-videojuego.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [EditarVideojuegoPage],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        EditarVideojuegoPageRoutingModule,
        ComponentsModule
    ]
})
export class EditarVideojuegoPageModule {}
