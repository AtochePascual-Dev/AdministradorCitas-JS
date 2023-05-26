// * VARIABLES
const inputMascota = document.querySelector('#mascota');
const inputProietrio = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};


// * CLASES
class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }
};


class UI {

  // * Muestra un mensaje en pantalla
  mostrarMensaje = (mensaje, exito = true) => {
    this.eliminarMensaje();

    const divMensaje = document.createElement('div');

    divMensaje.innerText = mensaje;
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'mensaje');

    (exito)
      ? divMensaje.classList.add('alert-success')
      : divMensaje.classList.add('alert-danger');

    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
  };



  // * Elimina un mensaje en pantalla en caso de existir
  eliminarMensaje = () => {
    const existeMensaje = document.querySelector('.mensaje');

    if (existeMensaje) existeMensaje.remove();
  };
};

const ui = new UI();
const administrarCitas = new Citas();


// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  inputMascota.addEventListener('input', llenarDatosCita);
  inputProietrio.addEventListener('input', llenarDatosCita);
  inputTelefono.addEventListener('input', llenarDatosCita);
  inputFecha.addEventListener('input', llenarDatosCita);
  inputHora.addEventListener('input', llenarDatosCita);
  inputSintomas.addEventListener('input', llenarDatosCita);
  formulario.addEventListener('submit', nuevaCita);
});


// * FUNCIONESmostrarMensaje
// * Llena nos datos del objeto cita
const llenarDatosCita = (event) => {
  // Obtenemos los datos de los input
  const name = event.target.name;
  const valor = event.target.value.trim();

  // asignamos el valor al objeto cita segun propiedad
  citaObj[name] = valor;
};



// * Valida y agrega una nueva cita a la lista de citas
const nuevaCita = (event) => {
  event.preventDefault();

  // Validamos si alguno de los valores es vacio
  if (Object.values(citaObj).includes('')) {
    ui.mostrarMensaje('Todos los campos son obligatorios', false);
    return;
  }

  // En caso de pasar la validacion mostramos un mensaje de exito
  ui.mostrarMensaje('Cita agregada correctamente');

  setTimeout(() => {
    // Eliminamos el mensje de exito
    ui.eliminarMensaje();
  }, 1000);

  // Generamos un id para la cita
  citaObj.id = Date.now();

  administrarCitas.agregarCita({ ...citaObj });
};