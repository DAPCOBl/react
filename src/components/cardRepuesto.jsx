import React, { useState, useEffect } from 'react';
import Loading from '../components/loader';


function RepuestosList() {
  const [repuestos, setRepuestos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRepuestos = async () => {
    try {
      const response = await fetch('../api/repuesto');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los repuestos');
      }
      const repuestosData = await response.json();
      setRepuestos(repuestosData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepuestos();
  }, []);

  const deleteRepuesto = async (_id) => {
    try {
      const response = await fetch(`../api/repuesto/${_id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el repuesto');
      }
      fetchRepuestos();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div>
      <h1>Lista de Repuestos</h1>
      <ul>
        {repuestos.map(repuesto => (
          <li key={repuesto._id}>
            <img src={repuesto.urlImg} alt={repuesto.nombre}/>
            <h2>{repuesto.nombre}</h2>
            <p>Precio: ${repuesto.precio}</p>
            <p>ID: {repuesto._id}</p>
            <p>Descripción: {repuesto.descripcionRepuesto}</p>
            <p>Referencia: {repuesto.referencia}</p>
            <p>Modelo: {repuesto.modelo}</p>
            <p>Marca: {repuesto.marca}</p>
            <p>Tipo de Repuesto: {repuesto.tipoRepuesto}</p>
            <p>Tipo de Garantía: {repuesto.tipoGarantia}</p>
            <p>Condición: {repuesto.condicion}</p>
            <button onClick={() => deleteRepuesto(repuesto._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepuestosList;
