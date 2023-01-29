import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { switchMap, tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidacionService } from 'src/app/validators/shared/validacion.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  // Defino el formulario
  // En esta definición incluyo
  // - Nombres de los campos. Deben coincidir con los del objeto
  // - Opciones de los campos
  // - Validaciones locales
  // - Validaciones asíncronas
  formulario: FormGroup = this.fb.group({
    id                : [-1],

    username            : [ '', 
                          [ Validators.required/*, this.validacionService.validarEmpiezaMayuscula ],
                          [ this.validacionTituloService*/ ]
                        ],
    
    password : ['', [Validators.required]],
    nombreCompleto : ['', [Validators.required]],
    rol : ['', [Validators.required]]                
  });

  // Indica si la tarea se está actualizando
  actualizando: boolean = false;

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------

  constructor(

    private activatedRoute    : ActivatedRoute,
    private fb                : FormBuilder,
    private router            : Router,
    private usuariosService   : UsuariosService,
    private validacionService : ValidacionService,
    private alertController   : AlertController,
    private toastController   : ToastController    

  ) { }

  /**
   * Inicialización de la página
   */
  ngOnInit(): void {

    // Si no estamos en modo edición, sale de aquí
    if(this.router.url.includes('editar')) {    
      this.cargarUsuario();
      this.actualizando = false;

      // Se carga la validación asíncrona en caso de edición
      //this.formulario.get('titulo')?.clearAsyncValidators();
    }

    // Cuando se selecciona un tipo de tarea, se debe cargar el combo de 
    // estados para que contenga los estados para ese tipo de tarea
    //this.formulario.get('id_tipo_tarea')?.valueChanges.subscribe(id_tipo_tarea => {      
    //  this.cargarSelectEstados(id_tipo_tarea);
    //});  
  }


  //-------------------------------------------------------------------------------------
  // Funciones generales del formulario
  //-------------------------------------------------------------------------------------

  /**
   * Guarda los cambios y vuelve a la pantalla anterior. 
   */
  guardar() {

    // Si el formulario no es válido, muestra un mensaje de error y termina
    if(this.formulario.invalid) {
      
      // Marco los campos como tocados. De ese modo se mostrarán todos los errores
      // registrados en los campos
      this.formulario.markAllAsTouched();

      // Muestro mensaje de error
      this.showAlert('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id es > 0 significa que el usuario ya existía. Es actualización
    if(this.formulario.get('id')?.value > 0) {

      // Actualiza el usuario
      this.actualizarUsuario();

    } else {

      // Crea el usuario
      this.crearUsuario();
    }
  } 


  esCampoNoValido(campo: string) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;    
  }


  mensajeErrorCampo(campo: string) {

    const errors = this.formulario.get(campo)?.errors;
    let mensajeError = '';
    
    if(errors) {
      for(let e in errors) {

        // Obtiene el mensaje
        const mensaje = this.validacionService.getMensajeError(e);
        mensajeError = mensajeError + mensaje;        

        // Solo quiero el primero en estos momentos. Si hubiera más podría tenerlos en un atributo
        // y mostrarlos con un ngFor
        break;
      }
    }

    return mensajeError;
  }

  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar usuarios
  //-------------------------------------------------------------------------------------

  /**
   * Cuando estamos editando, este método carga el usuario que estamos editando en el formulario
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
        
          // Reciebe el siguiente valor
          next: (usuario: Usuario) =>  {

            // Cargo los datos en el formulario.
            this.formulario.reset(usuario);

          },

          // El observer ha recibido una notificación completa
          complete: () => {     
          },

          // El observer ha recibido un error
          error: (error: any) => {

            // Se vuelve al listado
            this.router.navigate([ '/usuarios/listado' ]);
    
            // Muestra el error por consola
            console.log(error);
          }        
      });
  }

  /**
   * Actualiza un usuario a partir de los datos en el form
   */
  actualizarUsuario() {
    this.usuariosService.actualizarUsuario(this.formulario.getRawValue())
      .subscribe({      
          // Recibe el siguiente valor
          next: (usuario: Usuario) =>  {              
          },

          // El observer ha recibido una notificación completa
          complete: () => {     
            this.showToast("Usuario guardada", 'bottom');
            /*setTimeout(() =>
              this.router.navigate(['/listado-usuarios']),
              2000
            );*/
          },

          // El observer ha recibido un error
          error: (error: any) => {
            this.showToast("Usuario no guardada", 'bottom');
            console.log(error);
          },

      });
  }

  /**
   * Crea un usuario a partir de los datos en el form y pasa a modo edición
   */
  crearUsuario() {
    
    this.usuariosService.agregarUsuario(this.formulario.getRawValue()).subscribe(           
      {      
        // Recibe el siguiente valor
        next: (usuario: Usuario) =>  {

          console.log("usuariocreado",usuario);

          // Se ha guardado el videojuego. Paso a modo edición
          this.router.navigate(['editar-usuario', usuario.id ]);

          // Muestro un toast indicando que se ha guardado el usuario
          this.showToast("Usuario creado", 'bottom');

        },

        // El observer ha recibido una notificación completa
        complete: () => {     
          this.router.navigate(['/dashboard'])
        },

        // El observer ha recibido un error
        error: (error: any) => {
          
          this.showToast("Usuario ha sido posible crear el usuario", 'bottom');
          console.log(error);
        }
      }
    );    
  }


  //-------------------------------------------------------------------------------------
  // Muestra dialogos
  //-------------------------------------------------------------------------------------

  async showAlert(mensaje: string, titulo: string = "Atención") {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showToast(mensaje:string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: position
    });

    await toast.present();
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
