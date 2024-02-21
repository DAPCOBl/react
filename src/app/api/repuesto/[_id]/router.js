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

export async function READ(request, { params }) {
  try {
    const repuesto = await Repuesto.findById(params._id);

    if (!repuesto) {
      return new Response(
        JSON.stringify({
          message: "Repuesto no encontrado",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify(repuesto),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
