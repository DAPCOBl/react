// Importación de módulos
import { connectMongoDB } from "../../../lib/mongodb";
import Bodega from "../../../models/bodega";
import { NextResponse } from "next/server";

// Manejador de solicitudes POST para registrar una nueva devolución en la base de datos.
export async function POST(req) {
  try {
   // Extracción de los campos requeridos desde el cuerpo de la solicitud.
    const { name, direccion, numPhone  } = await req.json();

      // Conexión a la base de datos MongoDB.
    await connectMongoDB();

      // Creación de un nuevo documento de devolución con los campos proporcionados.
    await Bodega.create({name, direccion, numPhone  });


      // Devolver una respuesta JSON indicando el éxito en el registro.
    return NextResponse.json({ message: "Bodega registrado." }, { status: 201 });
  } catch (error) {
      // Devolver una respuesta JSON indicando un error durante el registro.

    return NextResponse.json(
      { message: "Ha ocurrido un error al registrar el bodega." },
      { status: 500 }
    );
  }
  
}


// Manejador de solicitudes GET para obtener todas las devoluciones desde la base de datos.
export async function GET() {
  try {
      // Obtener todas las devoluciones desde la base de datos.
    const results = await Bodega.find({});


      // Mapear las devoluciones obtenidas a un formato más sencillo.
    const mappedResults = results.map(result => ({
      _id: result._id,
      name: result.name,
      direccion: result.direccion,
      numPhone: result.numPhone,  
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
