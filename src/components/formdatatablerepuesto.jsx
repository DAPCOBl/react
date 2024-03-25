"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';

export default function CreateServicio() {
const { data: session } = useSession();
const [nombre, setNombre] = useState("");
const [precio, setPrecio] = useState("");
const router = useRouter();

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio) {
    Swal.fire({
        icon: "warning",
        title: "Registro inválido",
        text: "Rellene todos los campos.",
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
        precio,
       
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
        <h1>Registrar Repuesto</h1>

        <form onSubmit={handleSubmit}>
        <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
        />
        <input
            onChange={(e) => setPrecio(e.target.value)}
            type="text"
            placeholder="Precio"
        />
       
        <button type="submit">Agregar Repuesto</button>
        </form>
    </div>
    </div>
);
}
