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
};


class UI { };

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


// * FUNCIONES
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
    return;
  }
};