import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss'],
})
export class TablaUsuariosComponent {

  /**
   * Esto es el array de usuarios que se va a renderizar
   */
  @Input() usuarios: Usuario[] = [];

  /**
   * Evento que se va a emitir desde este componente cuando se quiera 
   * borrar un usuario
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor() { }

  /**
   * Para borrar usuario se pasa el índice dentro de la tabla de usuarios.
   * Más que nada porque luego se evita tener que recorrer la tabla para hacer la eliminación
   * 
   * @param indice 
   */
  borrarUsuario(indice: number): void {
    this.onBorrar.emit(indice);
  }

}
