import Marca from '../../../../models/marca';

// Función para manejar solicitudes de eliminación
export async function DELETE(request, { params }) { 
  
  try {
    const result = await Marca.findByIdAndDelete(params._id); 
    
// Si no se encuentra la marca
    if (!result) { 
      return new Response(
        JSON.stringify({
           // Devuelve un mensaje de marca no encontrada
          message: "Marca no encontrada",
        }),
        {
          // Con un código de estado HTTP 404
          status: 404, 
        }
      );
    }
// Si se encuentra y elimina la marca con éxito
    return new Response(null, { 
      // Devuelve una respuesta vacía con un código de estado HTTP 204 (No Content)
      status: 204, 
    });
    // Manejo de errores
  } catch (error) { 
    return new Response(
      JSON.stringify({
        // Devuelve el mensaje de error
        message: error.message, 
      }),
      // Con un código de estado HTTP 500 (Internal Server Error)
      { status: 500 } 
    );
  }
}


// Función para manejar solicitudes de actualización
export async function PUT(request, { params }) { 
  // Obtiene el nombre de marca de los datos de la solicitud
  const { nombre } = await request.json(); 

  try {
    // Busca y actualiza la marca por su ID con el nuevo nombre
    const result = await Marca.findByIdAndUpdate(params._id, { nombre }); 

// Si no se encuentra la marca
    if (!result) { 
      return new Response(
        JSON.stringify({
          // Devuelve un mensaje de marca no encontrada
          message: "Marca no encontrada", 
        }),
        {
          // Con un código de estado HTTP 404
          status: 404, 
        }
      );
    }
// Si se encuentra y actualiza la marca con éxito
    return new Response(null, { 
      // Devuelve una respuesta vacía con un código de estado HTTP 204 (No Content)
      status: 204, 
    });
    // Manejo de errores
  } catch (error) { 
    return new Response(
      JSON.stringify({
        // Devuelve el mensaje de error
        message: error.message, 
      }),
      // Con un código de estado HTTP 500 (Internal Server Error)
      { status: 500 } 
    );
  }
}
