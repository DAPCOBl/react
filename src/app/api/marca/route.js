import { connectMongoDB } from "../../../lib/mongodb";
import Marca from "../../../models/marca";
import { NextResponse } from "next/server";

// Función para manejar solicitudes POST
export async function POST(req) {
  try {
    // Extrae el nombre de la marca de los datos JSON de la solicitud
    const { nombre } = await req.json();
    // Conecta a la base de datos MongoDB
    await connectMongoDB();
    // Crea una nueva instancia de Marca con el nombre proporcionado
    await Marca.create({ nombre });
    // Devuelve una respuesta JSON con un mensaje de "Marca registrada." y un código de estado 201
    return NextResponse.json({ message: "Marca registrada." }, { status: 201 });
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta JSON con un mensaje de error y un código de estado 500
    return NextResponse.json(
      { message: "A ocurrido un error al registrar la marca." },
      { status: 500 }
    );
  }
}

// Función para manejar solicitudes GET
export async function GET() {
  try {
    // Busca todas las instancias de Marca en la base de datos
    const results = await Marca.find({});
    // Mapea los resultados para devolver solo los campos _id y nombre de cada marca
    const mappedResults = results.map(result => ({
      _id: result._id,
      nombre: result.nombre,
    }));
    // Devuelve una respuesta JSON con los resultados mapeados
    return NextResponse.json(mappedResults);
  } catch (error) {
    // Si ocurre un error, registra el error en la consola y devuelve una respuesta JSON con un mensaje de error y un código de estado 500
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
