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

export default Citas;