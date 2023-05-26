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



// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  inputMascota.addEventListener('input', llenarDatosCita);
  inputProietrio.addEventListener('input', llenarDatosCita);
  inputTelefono.addEventListener('input', llenarDatosCita);
  inputFecha.addEventListener('input', llenarDatosCita);
  inputHora.addEventListener('input', llenarDatosCita);
  inputSintomas.addEventListener('input', llenarDatosCita);
});


// * FUNCIONES
// * Llena nos datos del objeto cita
const llenarDatosCita = (event) => {
  // Obtenemos los datos de los input
  const name = event.target.name;
  const valor = event.target.value;

  // asignamos el valor al objeto cita segun propiedad
  citaObj[name] = valor;
};

