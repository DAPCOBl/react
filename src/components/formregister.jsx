"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';

export default function CreateServicio() {
const { data: session } = useSession();
const [nombre, setNombre] = useState("");
const router = useRouter();

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre ) {
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
        <h1>Registrar User</h1>

        <form onSubmit={handleSubmit}>
        <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
        />
       
       
        <button type="submit">Agregar User</button>
        </form>
    </div>
    </div>
);
}
