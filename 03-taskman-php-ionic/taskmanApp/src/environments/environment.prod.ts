export const environment = {
  production: true,
 
  // URL Base de los servicios de taskman
  taskmanBaseUrl: 'http://localhost:8080/api', 

  // Tiempo en milisegundos que un usuario debe estar sin pulsar una tecla
  // para que se acepte la entrada para lanzar por ejemplo un desplegable
  userInputDebounceDelay: 500,

  // Activa el modo depuración. Desactiva la autenticación.
  debug: 1  
};
