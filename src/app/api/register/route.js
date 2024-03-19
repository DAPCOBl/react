import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name,surname,numDoc,numPhone, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name,surname,numDoc,numPhone, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
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
      surname: result.surname,
      numDoc: result.numDoc,
      numPhone: result.numPhone,
      email: result.email,
      password: result.password,
      rol: {
        descripcionRol: result.rol.descripcionRol,
        estado: result.rol.estado,
      },
      tipoDoc: {
        descripcionTipoDoc: result.tipoDoc.descripcionTipoDoc,
      },
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