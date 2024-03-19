"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBodegaForm({ _id, name, direccion,numPhone }) {
    const [newName, setNewName] = useState(name);
    const [newDireccion, setNewDireccion] = useState(direccion);
    const [newNumPhone, setNewNumPhone] = useState(numPhone);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/bodega/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newDireccion, newNumPhone }),
            });

            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                type="text"
                placeholder="Bodega Name"
            />
            <input
                onChange={(e) => setNewDireccion(e.target.value)}
                value={newDireccion}
                type="text"
                placeholder="Bodega Direccion"
            />
            <input
                onChange={(e) => setNewNumPhone(e.target.value)}
                value={newNumPhone}
                type="text"
                placeholder="Bodega NumPhone"
            />
            <button>
                Update Bodega
            </button>
        </form>
    );
}