import mongoose, { Schema, models } from "mongoose";

const marcaSchema = new Schema(
  {
    marcaDescripcion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Marca = models.Marca || mongoose.model("Marca", marcaSchema);
export default Marca;


