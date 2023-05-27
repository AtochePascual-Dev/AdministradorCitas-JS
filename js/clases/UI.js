// * IMPORTACIONES
import { eliminarCita, editarCita } from '../funciones.js';
import { contenedorCitas } from '../selectores.js';

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

export default UI;