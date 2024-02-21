import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: false,
    },
    numDoc: {
      type: Number,
      required: false,
    },
    numPhone: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    rol: {
      descripcionRol: {
        type: String,
        default: null,
      },
      estado: {
        type: String,
        default: 'inactivo',
      },
    },
    tipoDoc: {
      descripcionTipoDoc: {
        type: String,
        default: 'Cedula Ciudadana',
      },
    }
  },
  { timestamps: true }
);


const User = models.User || mongoose.model("User", userSchema);
export default User;