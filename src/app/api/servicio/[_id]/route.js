import Servicio from '../../../../models/servicio';

export async function DELETE(request, { params }) {
  try {
    const result = await Servicio.findByIdAndDelete(params._id);

    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Servicio no encontrada",
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

export async function PUT(request, { params }) {
  const { nombre, descripcion, acciones } = await request.json();

  try {
    const result = await Servicio.findByIdAndUpdate(params._id, {
      nombre,
      descripcion,
      acciones
    });

    if (!result) {
      return new Response(
        JSON.stringify({
          message: 'Servicio no encontrado',
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
