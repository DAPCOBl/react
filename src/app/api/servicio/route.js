import { connectMongoDB } from "../../../lib/mongodb"; // Importar la función connectMongoDB desde la biblioteca mongodb
import Servicio from "../../../models/servicio"; // Importar el modelo Servicio
import { NextResponse } from "next/server"; // Importar NextResponse desde Next.js server

/**
 * Manejador de solicitudes POST para registrar un nuevo servicio
 * @param {Request} req - El objeto de solicitud
 * @returns {Response} - El objeto de respuesta
 */
export async function POST(req) {
  try {
    // Extraer los datos requeridos del cuerpo de la solicitud
    const { nombre, descripcion, acciones } = await req.json();

    // Conectarse a MongoDB
    await connectMongoDB();

    // Crear un nuevo servicio con los datos proporcionados
    await Servicio.create({ nombre, descripcion, acciones });

    return NextResponse.json({ message: "Servicio registrado." }, { status: 201 });
  } catch (error) {
    // Devolver una respuesta con un mensaje de error en caso de falla
    return NextResponse.json({ message: "Ha ocurrido un error al registrar el servicio." }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Obtener todos los servicios de la base de datos
    const results = await Servicio.find({});

    const mappedResults = results.map(result => ({
      _id: result._id,
      nombre: result.nombre,
      descripcion: result.descripcion,
      acciones: result.acciones,
    }));

    return NextResponse.json(mappedResults);
  } catch (error) {
    console.log('Error: ', error);
    // Devolver una respuesta con un mensaje de error en caso de falla
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}