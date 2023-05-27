// * IMPPRTACIONES
import Citas from './clases/Citas.js';
import UI from './clases/UI.js';
import { inputMascota, inputProietrio, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from './selectores.js';

// * VARIABLES
const ui = new UI();
const administrarCitas = new Citas();

const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

// * FUNCIONES
// * Llena nos datos del objeto cita
export const llenarDatosCita = (event) => {
  // Obtenemos los datos de los input
  const name = event.target.name;
  const valor = event.target.value.trim();

  // asignamos el valor al objeto cita segun propiedad
  citaObj[name] = valor;
};



// * Valida y agrega una nueva cita a la lista de citas
export const nuevaCita = (event) => {
  event.preventDefault();

  // Validamos si alguno de los valores es vacio
  if (Object.values(citaObj).includes('')) {
    ui.mostrarMensaje('Todos los campos son obligatorios', false);
    return;
  }

  // Si el objeto cita tiene un id entonces toca editar cita
  if (citaObj.id) {
    administrarCitas.editarCita({ ...citaObj });

    // Mostramos un mensaje de exito
    ui.mostrarMensaje('Cita editada correctamente');

    // Regresamos el texto del boton
    document.querySelector('button[type=submit]').textContent = 'Crear Cita';
  } else {
    // Si no tiene un id entonces crear una cita
    // Generamos un id para la cita
    citaObj.id = Date.now();

    // Agregamos la cita a la lista de citas
    administrarCitas.agregarCita({ ...citaObj });

    // Mostramos un mensaje de exito
    ui.mostrarMensaje('Cita agregada correctamente');
  }

  setTimeout(() => {
    // Eliminamos el mensje 
    ui.eliminarMensaje();
  }, 2000);

  // Reiniciamos la cita
  reiniciarCita();

  // Reiniciamos el formulario
  formulario.reset();

  // Mostramos la lista de citas en pantalla
  ui.mostrarCitasHtml(administrarCitas);
};



// * Reinicia el objeto de cita
export const reiniciarCita = () => {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
  delete citaObj.id;
};



// * Elimina una cita
export const eliminarCita = (id) => {
  // Eliminamos la cita de la lista
  administrarCitas.eliminarCita(id);

  // Mostramos un mensaje
  ui.mostrarMensaje('Cita eliminada correctamente');

  // Eliminamos el mensaje
  setTimeout(() => {
    ui.eliminarMensaje();
  }, 800);

  // Mostramos la nueva lista de citas
  ui.mostrarCitasHtml(administrarCitas);
};



// * Edita una cita
export const editarCita = (cita) => {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // LLenamos el formulario con la cita a editar
  inputMascota.value = mascota;
  inputProietrio.value = propietario;
  inputTelefono.value = telefono;
  inputFecha.value = fecha;
  inputHora.value = hora;
  inputSintomas.value = sintomas;

  // LLenamos el objeto de citas con la cita obtenida
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  document.querySelector('button[type=submit]').textContent = 'Editar Cita';
};