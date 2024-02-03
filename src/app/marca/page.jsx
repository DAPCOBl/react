"use client";
// pages/marca/index.jsx
import React, { useState, useEffect } from "react";
import MarcaCreate from "../../components/marcaCreate";
import MarcaRead from "../../components/marcaRead";
import MarcaUpdate from "../../components/marcaUpdate";
import DeleteButton from "../../components/marcaDelete";

export default function MarcaPage() {
  const [activeTab, setActiveTab] = useState("read");
  const [marcas, setMarcas] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchMarcas = async () => {
    try {
      const res = await fetch("/api/marca");
      const data = await res.json();
      setMarcas(data.marca);
    } catch (error) {
      console.error("Error fetching Marcas:", error);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  
  const handleDelete = async (_id) => {
    try {
      await fetch(`/api/marca/${_id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de marcas después de la eliminación
      fetchMarcas();
    } catch (error) {
      console.error("Error deleting Marca:", error);
    }
  };

  return (
    <div>
      <h1>Marcas</h1>
      <div>
        <button onClick={() => handleTabChange("create")}>Crear Marca</button>
        <button onClick={() => handleTabChange("read")}>Ver Marcas</button>
        <button onClick={() => handleTabChange("update")}>Actualizar Marca</button>
      </div>
      {activeTab === "create" && <MarcaCreate />}
      {activeTab === "read" && (
        <div>
          <ul>
            {marcas.map((marca) => (
              <li key={marca._id}>
                {marca.marcaDescripcion}{" "}
                <DeleteButton _id={marca._id} onDelete={() => handleDelete(marca._id)} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "update" && <MarcaUpdate />}
    </div>
  );
}
