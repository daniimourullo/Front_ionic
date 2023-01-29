import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage implements OnInit {

  // Lista de usuarios
  usuarios: Usuario[] = [];

  constructor(
        
    // Servicio para mostrar diálogos
    private alertController: AlertController,

    // Acceso al backend
    private usuariosService: UsuariosService
    
    ) {}

  ngOnInit(): void {

    // Carga los usuarios
    this.cargarUsuarios();
  }

  /**
   *  Método a invocar para lanzar la búsqueda 
   */   
  buscar(termino: string): void {
  
    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarUsuarios(termino);
  }

  /**
   * 
   * @param filtro Método para cargar los usuarios
   * 
   */
  private cargarUsuarios(filtro: string | undefined = undefined) {
    console.log('Se está ejecutando el cargarUsuarios')
    // Cuando la pantalla se muestra se tienen que mostrar los usuarios.
    this.usuariosService.getUsuariosPorUsername(filtro)
      .pipe(

        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )
      
      .subscribe({

        next: (usuarios: Usuario[]) => {
          
          console.log('usuarios', usuarios)
          //carga los datos
          this.usuarios = usuarios;
        },

        complete: () => {

        },

        error: (error: any) => {
          this.showAlert(error.mensaje, 'ERROR');
        }
      });
  }

  /**
   * Borrar usuario recibe el evento. El evento de la tabla de usuarios emite el ID en la tabla
   * 
   * @param indice 
   */
  borrarUsuario(indice: number) {

    // Obtiene el usuario a eliminar
    const usuario = this.usuarios[indice];

    // Si el usuario me confirma que quiere eliminar el usuario, lo elimina
    this.solicitarConfirmacion(`¿Está seguro de que quiere eliminar el usuario: ${usuario.username}?`, 'Atención',
      () => {

        // Elimina el usuario
        this.usuariosService.borrarUsuario(usuario).subscribe({

          // Recibe el siguiente valor
          next: (respuesta: any) =>  {
   
            // Elimina el usuario del array
            this.usuarios.splice(indice, 1);

            // Muestra el usuario en el log
            console.log('Usuario eliminado : '+usuario.id);
          },
  
          // El observer ha recibido una notificación completa
          complete: () => {     
          },
  
          // El observer ha recibido un error
          error: (error: any) => {
            this.showAlert(error.mensaje, 'ERROR');
          } 
        });      
      }
    );
  }


  async showAlert(mensaje: string, titulo: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async solicitarConfirmacion(mensaje: string, titulo: string, onOk: any) {
 
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            onOk();
          },
        },
      ],
    });

    await alert.present();
  }

}
