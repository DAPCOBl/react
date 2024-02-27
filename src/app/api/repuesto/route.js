import { connectMongoDB } from "../../../lib/mongodb";
import Repuesto from "../../../models/repuesto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { urlImg, nombre, descripcionRepuesto, referencia, precio, modelo, marca, tipoRepuesto, tipoGarantia, condicion, user  } = await req.json();
    await connectMongoDB();
    await Repuesto.create({ urlImg, nombre, descripcionRepuesto, referencia, precio, modelo, marca, tipoRepuesto, tipoGarantia, condicion,user });

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
      urlImg: result.urlImg,
      nombre: result.nombre,
      descripcionRepuesto: result.descripcionRepuesto,
      referencia: result.referencia,
      precio: result.precio,
      modelo: result.modelo,
      marca: result.marca,
      tipoRepuesto: result.tipoRepuesto,
      tipoGarantia: result.tipoGarantia,
      condicion: result.condicion,
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