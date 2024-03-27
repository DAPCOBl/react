// Importación de módulos
import { connectMongoDB } from "../../../lib/mongodb"; 
import Repuesto from "../../../models/repuesto"; 
import { NextResponse } from "next/server"; 

// Manejador de solicitudes POST para registrar una nueva devolución en la base de datos.
export async function POST(req) {
    try {
      // Extracción de los campos requeridos desde el cuerpo de la solicitud.
      const { urlImg, nombre, descripcionRepuesto, referencia, precio, modelo, tipoRepuesto, tipoGarantia, condicion, user, marca, bodega  } = await req.json();

      // Conexión a la base de datos MongoDB.
      await connectMongoDB();
      
      // Creación de un nuevo documento de devolución con los campos proporcionados.
      await Repuesto.create({ urlImg, nombre, descripcionRepuesto, referencia, precio, modelo, tipoRepuesto, tipoGarantia, condicion, user, marca, bodega });

      // Devolver una respuesta JSON indicando el éxito en el registro.
      return NextResponse.json({ message: "Repuesto registrado." }, { status: 201 });
    } catch (error) {
      // Devolver una respuesta JSON indicando un error durante el registro.
      return NextResponse.json(
        { message: "A ocurrido un error al registrar el Repuesto." },
        { status: 500 }
      );
    }
  }

// Manejador de solicitudes GET para obtener todas las repuestoes desde la base de datos.
export async function GET() {
    try {
      // Obtener todas las repuestoes desde la base de datos.
      const results = await Repuesto.find({});
  
      // Mapear las repuestoes obtenidas a un formato más sencillo.
      const mappedResults = results.map(result => ({
        _id: result._id,
        urlImg: result.urlImg,
        nombre: result.nombre,
        descripcionRepuesto: result.descripcionRepuesto,
        referencia: result.referencia,
        precio: result.precio,
        modelo: result.modelo,
        tipoRepuesto: result.tipoRepuesto,
        tipoGarantia: result.tipoGarantia,
        condicion: result.condicion,
        marca: result.marca,
        bodega: result.bodega,
      }));
  
      // Devolver una respuesta JSON con las repuestoes mapeadas.
      return NextResponse.json(mappedResults);
    } catch (error) {
      // Manejar cualquier error ocurrido durante el proceso y devolver una respuesta JSON indicando el error.
      console.log('Error: ', error);
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
