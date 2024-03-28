"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';


export default function CreateUser() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const [selectedRol, setSelectedRol] = useState("");
  const [roles, setRoles] = useState([]); // Aquí inicializamos roles como un array vacío

  useEffect(() => {
    // Aquí puedes hacer una llamada a tu API para obtener los roles
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles"); // Reemplaza "/api/roles" con la ruta correcta de tu API
        if (response.ok) {
          const rolesData = await response.json();
          setRoles(rolesData); // Actualizamos el estado de roles con los datos obtenidos
        } else {
          throw new Error("Error al obtener los roles");
        }
      } catch (error) {
        console.error("Error al obtener los roles:", error);
        // Puedes manejar el error aquí como consideres apropiado
      }
    };

    fetchRoles(); // Llamamos a la función para obtener los roles cuando el componente se monte

  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez, cuando el componente se monta

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !numPhone || !email || !selectedRol ) { // Cambié `rol` por `selectedRol` aquí
      Swal.fire({
        icon: "warning",
        title: "Registro inválido",
        text: "Rellene todos los campos.",
      });
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          numPhone,
          email,
          rol: { nombre: selectedRol },
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
          text: "Usuario ya registrado o hay un error en el servidor.",
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
        <h1>Registrar Usuario</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
          <input
            onChange={(e) => setNumPhone(e.target.value)}
            type="text"
            placeholder="Teléfono"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
         <select name="rol" id="rol" required onChange={(e) => setSelectedRol(e.target.value)}>
            <option value="">Selecciona un rol</option>
            {roles.map((rol, index) => (
              <option key={index} value={rol.nombre}>{rol.nombre}</option>
            ))}
            <option value="jefe bodega">Jefe Bodega</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Agregar usuario</button>
        </form>
      </div>
    </div>
  );
} 
