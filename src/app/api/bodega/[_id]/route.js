import Bodega from '../../../../models/bodega';


export async function DELETE(request, { params }) {
  try {
    const result = await Bodega.findByIdAndDelete(params._id);

    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Bodega no encontrado",
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
