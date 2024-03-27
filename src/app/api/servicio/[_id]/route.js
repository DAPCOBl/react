//importación de modulos
import Servicio from '../../../../models/servicio';

/*
Manejador de solicitudes DELETE para eliminar
*/
export async function DELETE(request, { params }) {
  try {
    //Eliminar un nuevo documento de servicio
    const result = await Servicio.findByIdAndDelete(params._id);

    //Verificar si servicio no fue encontrada
    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Servicio no encontrada",
        }),
        {
          //Codigo de estado HTTP 404, indicando que el recurso no fue encontrado
          status: 404,
        }
      );
    }
     //Solicitud procesada con éxito pero no hay contenido para retornar
    return new Response(null, {
      status: 204,
    });
    //Capturar error durante la operación
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      //Codigo de estado HTTP 500, indicando un error
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { nombre, descripcion,  } = await request.json();

  try {
    const result = await Servicio.findByIdAndUpdate(params._id, {
      nombre,
      descripcion,
    });
    //Verificar si servicio no fue encontrada
    if (!result) {
      return new Response(
        JSON.stringify({
          message: 'Servicio no encontrado',
        }),
        {
           //Codigo de estado HTTP 404, indicando que el recurso no fue encontrado
          status: 404,
        }
      );
    }
    //Solicitud procesada con éxito pero no hay contenido para retornar
    return new Response(null, {
      status: 204,
    });
    //Capturar error durante la operación
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      //Codigo de estado HTTP 500, indicando un error
      { status: 500 }
    );
  }
}
