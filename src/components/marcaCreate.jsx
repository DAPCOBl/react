import { useState } from "react";
import { useRouter } from "next/navigation"

export default function CreateMarca() {
  const [marcaDescripcion, setMarcaDescripcion] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/marca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ marcaDescripcion }),
      });

      if (res.status === 201) {
        router.push("/marca"); 
      } else {
        console.error("Error al crear la Marca");
      }
    } catch (error) {
      console.error("Error al crear la Marca:", error);
    }
  };

  return (
    <div>
      <h1>Create Marca</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Marca Descripcion:
          <input
            type="text"
            value={marcaDescripcion}
            onChange={(e) => setMarcaDescripcion(e.target.value)}
          />
        </label>
        <button type="submit">Crear Marca</button>
      </form>
    </div>
  );
}
