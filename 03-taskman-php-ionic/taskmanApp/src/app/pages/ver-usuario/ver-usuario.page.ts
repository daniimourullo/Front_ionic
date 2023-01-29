import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.page.html',
  styleUrls: ['./ver-usuario.page.scss'],
})
export class VerUsuarioPage implements OnInit {

  usuario! : Usuario | undefined;  

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------
  
  constructor(
  
    private activatedRoute    : ActivatedRoute,
    private router            : Router,
  
    private usuariosService     : UsuariosService
  
  ) { }
  
  /**
   * Inicialización de la página
   */
  ngOnInit(): void {
  
    // Carga la tarea
    this.cargarUsuario();
  
  }
  
  
  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar usuarios
  //-------------------------------------------------------------------------------------
  
  /**
   * Cuando estamos editando, este método carga la tarea que estamos editando en el formulario
   */
   cargarUsuario() {
      
    // Si estamos en modo edición, obtiene los parámeros
    // y carga los datos
    this.activatedRoute.params
      
      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
      // por el usuario
      .pipe(
  
          switchMap( ({id}) => this.usuariosService.getUsuarioPorId(id) ),
          
          // Este pipe muestra lo que viene
          tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe({

        next: (usuario: Usuario) => {
          this.usuario = usuario;
        },
        
        complete: () => {

        },
        
        error: (error) => {
          this.router.navigate([ '/listado-tareas' ]);
        }

      });
    }

}
