import Repuesto from "../../../../models/datatablerepuesto";

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
       nombre: result.nombre,
       acciones: result.acciones,
       
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
 