import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name,  acciones } = await req.json();
    await connectMongoDB();
    await User.create({ name,  acciones });
    return NextResponse.json({ message: "User registrado." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ha ocurrido un error al registrar el user." },
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