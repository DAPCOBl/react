import User from '../../../../models/user';




// Function to handle update requests
export async function PUT(request, { params }) {
    const {
      name,
      surname,
      numDoc,
      numPhone,
      email,
      password,
      rol: { descripcionRol, estado },
      tipoDoc: { descripcionTipoDoc },
    } = await request.json();
  
    try {
      const result = await User.findByIdAndUpdate(
        params._id,
        {
          name,
          surname,
          numDoc,
          numPhone,
          email,
          password,
          rol: { descripcionRol, estado },
          tipoDoc: { descripcionTipoDoc },
        },
        { new: true }
      );
  
      if (!result) {
        return new Response(
          JSON.stringify({
            message: "User not found",
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
        {
          status: 500,
        }
      );
    }
  }