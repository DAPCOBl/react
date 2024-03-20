import Marca from '../../../../models/marca';


export async function DELETE(request, { params }) {
  try {
    const result = await Marca.findByIdAndDelete(params._id);

    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Marca no encontrada",
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
