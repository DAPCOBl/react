"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";
import { useSession} from 'next-auth/react';

export default function CreateRepuesto() {
  const { data: session } = useSession();
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

    if (!urlImg || !nombre || !descripcionRepuesto || !referencia || !precio || !modelo || !marca || !tipoRepuesto || !tipoGarantia || !condicion) {
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "Rellene  todos los campos.",
      });
      return;
    }

    try {


      const res = await fetch("../api/repuesto", {
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
          text: "Repuesto ya registrado o hay un error en el servidor.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Proceso de registro fallido",
      });
    }
  };

  const handleImageChange = async () => {
    const { value: file } = await Swal.fire({
      title: "Selecciona la Imagen",
      input: "file",
      inputAttributes: {
        "accept": "image/*"
      }
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrlImg(e.target.result);
        Swal.fire({
          title: "La imagen ha sido cargada",
          imageUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        <h1>Registrar Repuesto</h1>

        <form onSubmit={handleSubmit}>
          
          
        <button type="button" onClick={handleImageChange}>Seleccionar Imagen</button>


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
