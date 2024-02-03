// route.js

import { ObjectId } from "mongodb";
import { connectMongoDB } from "../../../lib/mongodb";
import Marca from "../../../models/marca";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { marcaDescripcion } = await req.json();
    await connectMongoDB();
    await Marca.create({ marcaDescripcion });

    return NextResponse.json({ message: "Marca created." }, { status: 201 });
  } catch (error) {
    console.error("Error creating Marca:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the Marca." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const marcas = await Marca.find();

    return NextResponse.json({ marca: marcas }, { status: 200 }); // Corregir el nombre de la variable
  } catch (error) {
    console.error("Error fetching Marca data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching Marca data." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, marcaDescripcion } = await req.json();
    await connectMongoDB();
    const updatedMarca = await Marca.findByIdAndUpdate(id, { marcaDescripcion }, { new: true });

    if (!updatedMarca) {
      return NextResponse.json(
        { message: "Marca not found for update." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Marca updated.", marca: updatedMarca }, { status: 200 });
  } catch (error) {
    console.error("Error updating Marca:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the Marca." },
      { status: 500 }
    );
  }
}


export default async function deleteMarca(req) {
  try {
    const { _id } = req.params;
    await connectMongoDB(); 
    const deletedMarca = await Marca.findByIdAndDelete({ "_id": ObjectId(_id) });

    if (!deletedMarca) {
      return NextResponse.json(
        { message: "Marca no encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Marca eliminada.", marcas: deletedMarca }, { status: 200 });
  } catch (error) {
    console.error("Error al borrar marca:", error);
    return NextResponse.json(
      { message: "Un error ha ocurrido cuando se estaba eliminando la marca." },
      { status: 500 }
    );
  }
}
