import { connectMongoDB } from "../../../lib/mongodb";
import Marca from "../../../models/marca";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nombre } = await req.json();
    await connectMongoDB();
    await Marca.create({ nombre });

    return NextResponse.json({ message: "Marca registrada." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "A ocurrido un error al registrar la marca." },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const results = await Marca.find({});

    const mappedResults = results.map(result => ({
      _id: result._id,
      nombre: result.nombre,
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