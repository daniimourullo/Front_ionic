import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Videojuego, TaskmanConsultaVideojuegos } from '../interfaces/videojuego.interface';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {

  // Ruta base para todas las llamadas al servicio
  private taskmanBaseUrl = environment.taskmanBaseUrl;
  private debug = environment.debug;

  constructor(
    private httpClient: HttpClient
  ) {}

  // Genera la url dado el nombre del script
  private generarUrl(script: string) : string {
    return `${this.taskmanBaseUrl}/ajax.php?s=${script}${this.debug?"&__debug":""}`;
  }

  /**
   *  Dado el filtro, retorna las tareas que coinciden con el criterio
   */
  getVideojuegosPorTitulo(filtro: string = '%'): Observable<Videojuego> {

    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: (filtro == '%')?filtro:filtro+'%'
    };

    // Obtiene solo los datos
    return this.httpClient.post<Videojuego>(this.generarUrl("por-titulo"), argumentos);
  }

  /**
   * Borra una tarea pasada la tarea
   */
  borrarVideojuego(videojuego : Videojuego): Observable<Videojuego> {

    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: videojuego.id_videojuego
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos/"), argumentos);
  }


  /**
   * Dado el ID de una tarea, retorna la tarea asociada
   */
  getVideojuegoPorId(idVideojuego: number): Observable<Videojuego> {

    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: idVideojuego
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos/"), argumentos);
  }


  /**
   * Agrega una nueva tarea
   */
  agregarVideojuego(videojuego: Videojuego): Observable<Videojuego> {

    // El argumento es la tarea en formato JSON
    // La tarea no debe contener el ID. Si lo contiene se ignora
    const argumentos = JSON.stringify(videojuego);

    // Llama a eliminar la tarea
    return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos/"), argumentos);
  }


  /**
   * Pasada una tarea, actualiza la tarea.
   */
  actualizarVideojuego(videojuego: Videojuego): Observable<Videojuego> {

    // El argumento es la tarea en formato JSON
    const argumentos = JSON.stringify(videojuego);

    // Llama a eliminar la tarea
    return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos/"), argumentos);
  }

  /**
   * Obtiene el resumen de tareas por estado para poder hacer un gráfico
   */
  getResumenTareasPorEstado() {
    return this.httpClient.get<TaskmanConsultaVideojuegos>(this.generarUrl("_getResumenVideojuegosPorEstado"));
  }

}
