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
        enum: ['Jefe', 'Admin', 'Client'],
        default: 'Client',
      },
      estado: {
        type: String,
        enum: ['Inactivo', 'Activado'],
        default: 'Inactivo',
      },
    },
    tipoDoc: {
      descripcionTipoDoc: {
        type: String,
        enum: ['Cedula Ciudadana', 'Cédula Extranjera', 'Tarjeta de identidad'],
        default: 'Cedula Ciudadana',
      },
    }
  },
  { timestamps: true }
);


const User = models.User || mongoose.model("User", userSchema);
export default User;