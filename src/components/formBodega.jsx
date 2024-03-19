"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";

export default function CreateBodega() {
  const [name, setname] = useState("");
  const [direccion, setdireccion] = useState("");
  const [numPhone, setnumPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !direccion || !numPhone) {
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "Rellene  todos los campos.",
      });
      return;
    }

    try {


      const res = await fetch("api/bodega", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          direccion,
          numPhone,
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
          text: "Bodega ya registrado o hay un error en el servidor.",
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
    <div className="Registrar-Bodega">
      <div className="Registrar Bodega">
        <h1>BODEGA</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Nombre de la sede"
          />
          <input
            onChange={(e) => setdireccion(e.target.value)}
            type="text"
            placeholder="Direccion"
          />
          <input
            onChange={(e) => setnumPhone(e.target.value)}
            type="text"
            placeholder="Número"
          />
          <button type="submit">Agregar Bodega</button>
        </form>
      </div>
    </div>
  );
}