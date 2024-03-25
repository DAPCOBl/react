import { connectMongoDB } from "../../../lib/mongodb";
import Servicio from "../../../models/servicio";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nombre, descripcion, acciones } = await req.json();
    await connectMongoDB();
    await Servicio.create({ nombre, descripcion, acciones });
    return NextResponse.json({ message: "Servicio registrado." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ha ocurrido un error al registrar el servicio." },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
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