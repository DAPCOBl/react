// Importación de módulos
import Devolucion from '../../../../models/devolucion'; 
/*
    Manejador de solicitudes DELETE para eliminar una bodega en la base de datos.
*/
export async function DELETE(request, { params }) {
  try {
// Eliminar un nuevo documento de bodega con el id proporcionado.
    const result = await Devolucion.findByIdAndDelete(params._id);

     //  Verificar si la bodega no fue encontrada
    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Devolucion no encontrada",
        }),
        {
         // Código de estado HTTP 404, indicando que el recurso no fue encontrado.
          status: 404,
        }
      );
    }

        //Solicitud procesada con éxito pero no hay contenido para retornar.
    return new Response(null, {
      status: 204,
    });
    
    // Capturar error durante la operación
  } catch (error) {
    return new Response(
      JSON.stringify({
        // Mensaje de error capturado.
        message: error.message,
      }),
      // Código de estado HTTP 500, indicando un error interno del servidor.
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { FechaDevolucion, MotivoDevolucion } = await request.json(); 

  try {
    const result = await Devolucion.findByIdAndUpdate(params._id, {
      FechaDevolucion,
      MotivoDevolucion,
    });

    if (!result) {
      return new Response(
        JSON.stringify({
          message: 'Devolucion no encontrada',
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
