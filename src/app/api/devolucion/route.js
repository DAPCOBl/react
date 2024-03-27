// Importación de módulos
import { connectMongoDB } from "../../../lib/mongodb"; 
import Devolucion from "../../../models/devolucion"; 
import { NextResponse } from "next/server"; 

// Manejador de solicitudes POST para registrar una nueva devolución en la base de datos.
export async function POST(req) {
    try {
      // Extracción de los campos requeridos desde el cuerpo de la solicitud.
      const {  FechaDevolucion, MotivoDevolucion  } = await req.json();
      
      // Conexión a la base de datos MongoDB.
      await connectMongoDB();
      
      // Creación de un nuevo documento de devolución con los campos proporcionados.
      await Devolucion.create({ FechaDevolucion, MotivoDevolucion });
  
      // Devolver una respuesta JSON indicando el éxito en el registro.
      return NextResponse.json({ message: "Devolucion registrado." }, { status: 201 });
    } catch (error) {
      // Devolver una respuesta JSON indicando un error durante el registro.
      return NextResponse.json(
        { message: "A ocurrido un error al registrar el Devolucion." },
        { status: 500 }
      );
    }
  }

// Manejador de solicitudes GET para obtener todas las devoluciones desde la base de datos.
export async function GET() {
    try {
      // Obtener todas las devoluciones desde la base de datos.
      const results = await Devolucion.find({});
  
      // Mapear las devoluciones obtenidas a un formato más sencillo.
      const mappedResults = results.map(result => ({
        _id: result._id,
        FechaDevolucion: result.FechaDevolucion,
        MotivoDevolucion: result.MotivoDevolucion,
      }));
  
      // Devolver una respuesta JSON con las devoluciones mapeadas.
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
