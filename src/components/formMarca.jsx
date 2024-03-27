"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';

export default function CreateMarca() {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const validarNombre = (nombre) => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(nombre);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!nombre) {
      Swal.fire({
        icon: "warning",
        title: "Registro inválido",
        text: "Rellene todos los campos.",
      });
      return; 
    }

    if (!validarNombre(nombre)) {
      Swal.fire({
        icon: "warning",
        title: "Nombre inválido",
        text: "El nombre de la marca debe comenzar con una mayúscula, sin números ni otros caracteres.",
      });
      return;
    }

    try {
      const res = await fetch("/api/marca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
        }),
      });

      if (res.ok) {
        const form = e.target; 
        form.reset(); 
        router.push("/"); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Registro fallido",
          text: "Marca ya registrada o hay un error en el servidor.",
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
        <h1>Registrar Marca</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
            maxLength={10}
          />

          <button type="submit">Agregar Marca</button>
        </form>
      </div>
    </div>
  );
}
