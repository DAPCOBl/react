"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function CreateRepuesto() {
  const [urlImg, setUrlImg] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcionRepuesto, setDescripcionRepuesto] = useState("");
  const [referencia, setReferencia] = useState("");
  const [precio, setPrecio] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [tipoRepuesto, setTipoRepuesto] = useState("");
  const [tipoGarantia, setTipoGarantia] = useState("");
  const [condicion, setCondicion] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!urlImg || !nombre) {
      setError("TODOS LOS CAMPOS SON NECESARIOS");
      return;
    }

    try {
      

      const res = await fetch("api/repuesto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urlImg,
          nombre,
          descripcionRepuesto,
          referencia,
          precio,
          modelo,
          marca,
          tipoRepuesto,
          tipoGarantia,
          condicion,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("Repuesto registrado fallido.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUrlImg(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        <h1>Registrar Repuesto</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
          <input
            onChange={(e) => setDescripcionRepuesto(e.target.value)}
            type="text"
            placeholder="DescripcionRepuesto"
          />
          <input
            onChange={(e) => setReferencia(e.target.value)}
            type="text"
            placeholder="Referencia"
          />
          <input
            onChange={(e) => setPrecio(e.target.value)}
            type="text"
            placeholder="Precio"
          />
          <input
            onChange={(e) => setModelo(e.target.value)}
            type="text"
            placeholder="Modelo"
          />
          <input
            onChange={(e) => setMarca(e.target.value)}
            type="text"
            placeholder="Marca"
          />
          <input
            onChange={(e) => setTipoRepuesto(e.target.value)}
            type="text"
            placeholder="TipoRepuesto"
          />
          <input
            onChange={(e) => setTipoGarantia(e.target.value)}
            type="text"
            placeholder="TipoGarantia"
          />
          <input
            onChange={(e) => setCondicion(e.target.value)}
            type="text"
            placeholder="Condicion"
          />
          <button type="submit">Agregar Repuesto</button>
        </form>
      </div>
    </div>
  );
}
