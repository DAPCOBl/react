const mongoose = require('mongoose');

const DevolucionSchema = new mongoose.Schema(
  {

    FechaDevolucion: {
      type: String,
      required: true,
    },
    MotivoDevolucion: {
      type: String,
      required: true,
    },
},
  { timestamps: true }
);

const Devolucion = mongoose.models.Devolucion || mongoose.model('Devolucion', DevolucionSchema);

module.exports = Devolucion;
