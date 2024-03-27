"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";
import { useSession } from 'next-auth/react';


export default function CreateRepuesto() {
  const { data: session } = useSession();
  const [urlImg, setUrlImg] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcionRepuesto, setDescripcionRepuesto] = useState("");
  const [referencia, setReferencia] = useState("");
  const [precio, setPrecio] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipoRepuesto, setTipoRepuesto] = useState("");
  const [tipoGarantia, setTipoGarantia] = useState("");
  const [condicion, setCondicion] = useState("");
  const [bodegas, setBodegas] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [selectedBodega, setSelectedBodega] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");

  const fetchBodegas = async () => {
    try {
      const response = await fetch('../api/bodega');
      const data = await response.json();
      setBodegas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBodegas();
  }, []);


  const fetchMarcas = async () => {
    try {
      const response = await fetch('../api/marca');
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!urlImg || !nombre || !descripcionRepuesto || !referencia || !precio || !modelo || !tipoRepuesto || !tipoGarantia || !condicion) {
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "Rellene  todos los campos.",
      });
      return;
    }

    try {
      const res = await fetch("/api/repuesto", {
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
          tipoRepuesto,
          tipoGarantia,
          condicion,
          user: { name: session.user.name },
          bodega: { sede: selectedBodega },
          marca: { nombre: selectedMarca },
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
      <div className="Registrar">
        <h1>Registrar Repuesto</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
          <input
            onChange={(e) => setDescripcionRepuesto(e.target.value)}
            type="text"
            placeholder="DescripciónRepuesto"
          />
          <input
            onChange={(e) => setReferencia(e.target.value)}
            type="text"
            placeholder="Referencia"
          />
          <input
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^0-9]/g, '');
              setPrecio(inputValue);
            }}
            type="text"
            placeholder="Precio"
          />
          <input
            onChange={(e) => setModelo(e.target.value)}
            type="text"
            placeholder="Modelo"
          />
          <select
            onChange={(e) => setTipoRepuesto(e.target.value)}
            name="tipoRepuesto">
            <option value="">Selecciona un Tipo de Repuesto</option>
            <option value="Full Inyection">Full Inyection</option>
            <option value="Carburador">Carburador</option>
          </select>
          <input
            onChange={(e) => setTipoGarantia(e.target.value)}
            type="text"
            placeholder="TipoGarantía"
          />
          <select
            onChange={(e) => setCondicion(e.target.value)}
            name="condicion">
            <option value="">Selecciona una Condición</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
            <option value="Reacondicionado">Reacondicionado</option>
          </select>
          <select name="bodega" id="bodega" required onChange={(e) => setSelectedBodega(e.target.value)}>
            <option value="">Selecciona una bodega</option>
            {bodegas.map((bodega) => (
              <option value={bodega.name}>{bodega.name}</option>
            ))}
          </select>

          <select name="marca" id="marca" required onChange={(e) => setSelectedMarca(e.target.value)}>
            <option value="">Selecciona una marca</option>
            {marcas.map((marca) => (
              <option value={marca.nombre}>{marca.nombre}</option>
            ))}
          </select>
          <button type="button" onClick={handleImageChange}>Seleccionar Imagen</button>
          <button type="submit">Agregar Repuesto</button>
        </form>
      </div>
    </div>
  );
}