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

  eliminarCita(id) {
    this.citas = this.citas.filter(cita => cita.id !== id);
  };

  editarCita(citaEdit) {
    this.citas.forEach(cita => {
      if (cita.id === citaEdit.id) {
        cita.mascota = citaEdit.mascota;
        cita.propietario = citaEdit.propietario;
        cita.telefono = citaEdit.telefono;
        cita.fecha = citaEdit.fecha;
        cita.hora = citaEdit.hora;
        cita.sintomas = citaEdit.sintomas;
      }
    });
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



  // * Muestra las citas en pantalla
  mostrarCitasHtml({ citas }) { //  destructuring dentro del parametro

    this.limpiarCitasHtml();

    citas.forEach(cita => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
      const divCita = document.createElement('div');

      divCita.classList.add('cita', 'p-3');
      divCita.dataset.id = id;

      // Scripting
      const mascotaText = document.createElement('h2');
      mascotaText.textContent = mascota;
      mascotaText.classList.add('card-title', 'font-weight-bolder');

      const propietarioText = document.createElement('p');
      propietarioText.innerHTML = `
      <span class="font-weight-bolder">Propietario:</span> ${propietario}`;

      const telefonoText = document.createElement('p');
      telefonoText.innerHTML = `
      <span class="font-weight-bolder">Telefono:</span> ${telefono}`;

      const fechaText = document.createElement('p');
      fechaText.innerHTML = `
      <span class="font-weight-bolder">Fecha:</span> ${fecha}`;

      const horaText = document.createElement('p');
      horaText.innerHTML = `
      <span class="font-weight-bolder">Hora:</span> ${hora}`;

      const sintomasText = document.createElement('p');
      sintomasText.innerHTML = `
      <span class="font-weight-bolder">Sintomas:</span> ${sintomas}`;

      // boton para eliminar cita
      const bntEliminar = document.createElement('button');
      bntEliminar.textContent = 'Eliminar';
      bntEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      bntEliminar.onclick = () => {
        eliminarCita(id);
      }

      // Boton para editar un cita
      const bntEditar = document.createElement('button');
      bntEditar.textContent = 'Editar';
      bntEditar.classList.add('btn', 'btn-info');
      bntEditar.onclick = () => {
        editarCita(cita);
      }


      divCita.append(mascotaText, propietarioText, telefonoText, fechaText, horaText, sintomasText, bntEliminar, bntEditar);

      contenedorCitas.appendChild(divCita);
    });
  };



  // * Limpia el listdo de citas en pantalla
  limpiarCitasHtml() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.firstChild.remove();
    }
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

  // Si el objeto cita tiene un id entonces toca editar cita
  if (citaObj.id) {
    administrarCitas.editarCita(citaObj);

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
const reiniciarCita = () => {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
  delete citaObj.id;
};



// * Elimina una cita
const eliminarCita = (id) => {
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
const editarCita = (cita) => {
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