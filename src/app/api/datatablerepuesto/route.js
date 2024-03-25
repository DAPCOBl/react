import { connectMongoDB } from "../../../lib/mongodb";
import Repuesto from "../../../models/datatablerepuesto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {  nombre,  acciones  } = await req.json();
    await connectMongoDB();
    await Repuesto.create({  nombre,  acciones });

    return NextResponse.json({ message: "Repuesto registrado." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "A ocurrido un error al registrar el repuesto." },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const results = await Repuesto.find({});

    const mappedResults = results.map(result => ({
      _id: result._id,
      nombre: result.nombre,
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