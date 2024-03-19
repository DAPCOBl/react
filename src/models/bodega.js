const mongoose = require('mongoose');

const BodegaSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        direccion: {
          type: String,
          required: true,
        },
        numPhone: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

const Bodega = mongoose.models.Bodega || mongoose.model('Bodega', BodegaSchema);

module.exports = Bodega;