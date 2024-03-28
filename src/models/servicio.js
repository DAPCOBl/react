const mongoose = require('mongoose');

const ServicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },

    
  },
  { timestamps: true }
);

const Servicio = mongoose.models.Servicio || mongoose.model('Servicio', ServicioSchema);

module.exports = Servicio;
