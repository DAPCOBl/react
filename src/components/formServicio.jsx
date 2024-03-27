import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';

export default function CreateServicio() {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const router = useRouter();

  const nombreRegex = /^[a-zA-Z ]{1,30}$/;
  
  const descripcionRegex = /^[a-zA-Z0-9 ,.!?:;'()"-]{1,50}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRegex.test(nombre)) {
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "El nombre debe tener entre 2 y 30 caracteres alfabéticos.",
      });
      return;
    }

    if (!descripcionRegex.test(descripcion)) {
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "La descripcion debe tener entre 10 y 200 caracteres alfanuméricos, espacios, y los siguientes caracteres especiales: .,!?:;'()\"-",
      });
      return;
    }

    try {

      const res = await fetch("/api/servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registro fallido.",
          text: "Servicio ya registrado o hay un error en el servidor.",
        });
      }
        } catch (error) {
            Swal.fire({
            icon: "error",
            title: "Proceso de registro fallido",
            });
        }
        };

  return (
    <div>
      <div className="Registrar">
        <h1>Registrar Servicio</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
           <input
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            placeholder="Descripcion"
          />
          <button type="submit">Agregar Servicio</button>
        </form>
      </div>
    </div>
  );
}