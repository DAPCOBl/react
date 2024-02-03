// pages/marca/read.jsx
import { useEffect, useState } from "react";

export default function ReadMarca() {
  const [marca, setMarca] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/marca");
        const data = await res.json();
        setMarca(data.marca);
      } catch (error) {
        console.error("Error al obtener datos de Marca:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Marcas</h1>
      <ul>
        {marca.map((marca) => (
          <li key={marca._id}>{marca.marcaDescripcion}</li>
        ))}
      </ul>
    </div>
  );
}
