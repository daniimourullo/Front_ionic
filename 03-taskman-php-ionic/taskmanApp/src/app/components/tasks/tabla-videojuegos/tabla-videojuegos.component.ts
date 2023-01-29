import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Videojuego } from 'src/app/interfaces/videojuego.interface';

@Component({
  selector: 'app-tabla-videojuegos',
  templateUrl: './tabla-videojuegos.component.html',
  styleUrls: ['./tabla-videojuegos.component.scss'],
})
export class TablaVideojuegosComponent {

 /**
   * Esto es el array de tareas que se va a renderizar
   */
  @Input() videojuegos: Videojuego[] = [];

  /**
   * Evento que se va a emitir desde este componente cuando se quiera
   * borrar une tarea
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor() { }

  /**
   * Bara borrar tarea se pasa el índice dentro de la tabla de tareas.
   * Más que nada porque luego se evita tener que recorrer la tabla para hacer la eliminación
   *
   * @param indice
   */
  borrarVideojuego(indice: number): void {
    this.onBorrar.emit(indice);
  }

}
