import User from "../../../../models/user";

export async function GET(request, { params }) {
  try {
      const result = await User.findOne({ email: params });

      if (!result) {
          return new Response(
              JSON.stringify({
                  message: "User no encontrado",
              }),
              {
                  status: 404,
              }
          );
      }

      return new Response(JSON.stringify({
          _id: result._id,
          name: result.name,
          surname: result.surname,
          numDoc: result.numDoc,
          numPhone: result.numPhone,
          email: result.email,
          descripcionRol: result.rol.descripcionRol,
          estado: result.rol.estado,
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

export async function PUT(request, { params }) {
  const { rol: { descripcionRol, estado } } = await request.json();
   
  try {
     const result = await User.findByIdAndUpdate(params._id, {
       'rol.descripcionRol': descripcionRol,
       'rol.estado': estado,
     }, { new: true });
 
     if (!result) {
       return new Response(
         JSON.stringify({
           message: 'Usuario no encontrada',
         }),
         {
           status: 404,
         }
       );
     }
 
     return new Response(JSON.stringify(result), { 
       headers: {
         'Content-Type': 'application/json',
       },
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