import User from '../../../../models/user';

export async function DELETE(request, { params }) {
  try {
    const result = await User.findByIdAndDelete(params._id);

    if (!result) {
      return new Response(
        JSON.stringify({
          message: "User no encontrada",
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
  const { nombre,  acciones } = await request.json();

  try {
    const result = await User.findByIdAndUpdate(params._id, {
      name,
      acciones,
    });

    if (!result) {
      return new Response(
        JSON.stringify({
          message: 'User no encontrado',
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
