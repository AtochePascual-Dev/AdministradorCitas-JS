// * IMPORTCIONES
import { llenarDatosCita, nuevaCita } from '../funciones.js';
import { inputMascota, inputProietrio, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from '../selectores.js';

class App {

  constructor() {
    this.initApp();
  }

  initApp() {
    inputMascota.addEventListener('input', llenarDatosCita);
    inputProietrio.addEventListener('input', llenarDatosCita);
    inputTelefono.addEventListener('input', llenarDatosCita);
    inputFecha.addEventListener('input', llenarDatosCita);
    inputHora.addEventListener('input', llenarDatosCita);
    inputSintomas.addEventListener('input', llenarDatosCita);
    formulario.addEventListener('submit', nuevaCita);
  };
}

export default App;