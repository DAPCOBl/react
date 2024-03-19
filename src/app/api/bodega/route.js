import { connectMongoDB } from "../../../lib/mongodb";
import Bodega from "../../../models/bodega";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const { name, direccion, numPhone  } = await req.json();
      await connectMongoDB();
      await Bodega.create({ name, direccion, numPhone });
  
      return NextResponse.json({ message: "Bodega registrado." }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "A ocurrido un error al registrar el Bodega." },
        { status: 500 }
      );
    }
  }

  export async function GET() {
    try {
      const results = await Bodega.find({});
  
      const mappedResults = results.map(result => ({
        _id: result._id,
        name: result.name,
        direccion: result.direccion,
        numPhone: result.numPhone,  
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