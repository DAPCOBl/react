const mongoose = require('mongoose');

const RepuestoSchema = new mongoose.Schema(
  {

     Nombre: {
      type: String,
      required: true,
    },
   
    Acciones: {
        type: String,
        required: true,
      },
},
  { timestamps: true }
);

const Repuesto = mongoose.models.Repuesto || mongoose.model('Repuesto', RepuestoSchema);

module.exports = Repuesto;