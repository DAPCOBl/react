const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Marca = mongoose.models.Marca || mongoose.model('Marca', MarcaSchema);

module.exports = Marca;
