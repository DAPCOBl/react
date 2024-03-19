import Repuesto from "../../../../models/repuesto";

export async function DELETE(request, { params }) {
  try {
    const result = await Repuesto.findByIdAndDelete(params._id);

    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Repuesto no encontrado",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
     const result = await Repuesto.findById(params._id);
 
     if (!result) {
       return new Response(
         JSON.stringify({
           message: "Repuesto no encontrado",
         }),
         {
           status: 404,
         }
       );
     }
 
     return new Response(JSON.stringify({
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
     }), {
       status: 200,
     });
  } catch (error) {
     return new Response(
       JSON.stringify({
         message: error.message,
       }),
       { status: 500 }
     );
  }
 }
 