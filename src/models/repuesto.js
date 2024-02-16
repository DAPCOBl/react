const mongoose = require('mongoose');

const RepuestoSchema = new mongoose.Schema(
  {
    urlImg: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    descripcionRepuesto: {
      type: String,
      required: true,
    },
    referencia: {
      type: String,
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    tipoRepuesto: {
      type: String,
      required: true,
    },
    tipoGarantia: {
      type: String,
      required: true,
    },
    condicion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Repuesto = mongoose.models.Repuesto || mongoose.model('Repuesto', RepuestoSchema);

module.exports = Repuesto;