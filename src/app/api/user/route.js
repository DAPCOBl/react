import { connectMongoDB } from "../../../lib/mongodb"; 
import User from "../../../models/user"; 
import { NextResponse } from "next/server"; 

export async function POST(req) {
    try {
      const { name, numPhone, email} = await req.json();

      await connectMongoDB();
      
      await User.create({ name, numPhone, email});

      return NextResponse.json({ message: "User registrado." }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "A ocurrido un error al registrar el User." },
        { status: 500 }
      );
    }
  }

export async function GET() {
    try {
      const results = await User.find({});
  
      const mappedResults = results.map(result => ({
        _id: result._id,
        name: result.name,
        numPhone: result.numPhone,
        email: result.email,
        descripcionRol: result.rol.descripcionRol,
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
