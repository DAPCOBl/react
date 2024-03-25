 // Indica que este archivo se ejecutará en el cliente
 "use client";

// Importa useState y useEffect desde React para manejar el estado y los efectos secundarios
import { useState, useEffect } from "react";
// Importa el hook useRouter desde next/navigation para manejar la navegación en Next.js
import { useRouter } from "next/navigation"
// Importa la función Swal desde SweetAlert2 para mostrar alertas personalizadas
import Swal from "sweetalert2";
// Importa el hook useSession desde next-auth/react para manejar la sesión del usuario
import { useSession } from 'next-auth/react';

// Define el componente CreateMarca
export default function CreateMarca() {
  // Obtiene la sesión del usuario actual
  const { data: session } = useSession();
  // Define el estado para almacenar el nombre de la marca
  const [nombre, setNombre] = useState("");
  // Obtiene la instancia del router de Next.js
  const router = useRouter();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    // Evita que el formulario se envíe automáticamente
    e.preventDefault(); 

    // Verifica si el campo del nombre está vacío
    if (!nombre) {
      // Muestra una alerta con SweetAlert2 si el campo está vacío
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "Rellene  todos los campos.",
      });
      // Sale de la función si el campo está vacío
      return; 
    }

    try {
      // Realiza una solicitud POST a la API para registrar la marca
      const res = await fetch("/api/marca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           // Envía el nombre de la marca en el cuerpo de la solicitud
          nombre,
        }),
      });

      // Verifica si la solicitud fue exitosa
      if (res.ok) {
        // Obtiene el formulario actual
        const form = e.target; 
        // Reinicia el formulario después de registrar la marca
        form.reset(); 
        // Redirige a la página de inicio después del registro
        router.push("/"); 
      } else {
        // Muestra una alerta si ocurre un error en la solicitud
        Swal.fire({
          icon: "error",
          title: "Registro fallido.",
          text: "Marca ya registrado o hay un error en el servidor.",
        });
      }
    } catch (error) {
      // Muestra una alerta si ocurre un error durante el proceso de registro
      Swal.fire({
        icon: "error",
        title: "Proceso de registro fallido",
      });
    }
  };

  // Renderiza el componente
  return (
    <div>
      <div className="Registrar">
        <h1>Registrar Marca</h1>

        {/* Formulario para registrar una nueva marca */}
        <form onSubmit={handleSubmit}>
          {/* Input para ingresar el nombre de la marca */}
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
          {/* Botón para enviar el formulario */}
          <button type="submit">Agregar Marca</button>
        </form>
      </div>
    </div>
  );
}
