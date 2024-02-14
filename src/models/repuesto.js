const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repuestoSchema = new Schema(
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
      type: String,
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

module.exports = mongoose.model('Repuesto', repuestoSchema);
