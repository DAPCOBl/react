import { connectMongoDB } from "../../../lib/mongodb";
import Repuesto from "../../../models/repuesto";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { urlImg, nombre, descripcionRepuesto, referencia, precio, modelo, marca, tipoRepuesto, tipoGarantia, condicion } = req.body;
      await connectMongoDB();
      await Repuesto.create({ urlImg, nombre, descripcionRepuesto, referencia, precio, modelo, marca, tipoRepuesto, tipoGarantia, condicion});

      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const uploadPath = `./uploads/${filename}`;
      await new Promise((resolve, reject) =>
        stream
          .pipe(fs.createWriteStream(uploadPath))
          .on("finish", resolve)
          .on("error", reject)
      );

      return res.status(201).json({ message: "Repuesto registered and file uploaded successfully." });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while registering the Repuesto." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}