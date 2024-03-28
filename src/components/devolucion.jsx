"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';


export default function CreateDevolucion() {
  const { data: session } = useSession();
  const [FechaDevolucion, setFechaDevolucion] = useState("");
  const [MotivoDevolucion, setMotivoDevolucion] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FechaDevolucion || !MotivoDevolucion ) {
      Swal.fire({
        icon: "warning",
        title: "Devolucion inválido",
        text: "Rellene todos los campos.",
      });
      return;
    }
    try {


      const res = await fetch("/api/devolucion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FechaDevolucion,
          MotivoDevolucion,
          user: { name: session.user.name },
          
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
        title: "Proceso de devolución fallido",
      });
    }
  };

  return (
    <div className="Registrar-Devolucion">
      <div className="Registrar Devolucion">
        <h1>DEVOLUCIÓN</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setFechaDevolucion(e.target.value)}
            type="text"
            placeholder="FechaDevolucion"
          />
          <input
            onChange={(e) => setMotivoDevolucion(e.target.value)}
            type="text"
            placeholder="MotivoDevolucion"
          />
          <button type="submit">Agregar Devolución</button>
        </form>
      </div>
    </div>
  );
}
