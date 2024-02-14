"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function CreateRepuesto() {
  const [urlImg, seturlImg] = useState("");
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

      if (res.status === 201) {
        router.push("/repuesto");
      } else {
        console.error("Error al crear la Marca");
      }
    } catch (error) {
      console.error("Error al crear la Marca:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Registrar Repuesto</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => seturlImg(e.target.value)}
            type="file"
          />


          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

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
