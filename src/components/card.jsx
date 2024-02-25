import React, { useState, useEffect } from 'react';
import { Link ,BrowserRouter as Router, } from 'react-router-dom';

function RepuestosList() {
  const [repuestos, setRepuestos] = useState([]);
  const [error, setError] = useState(null);

  const fetchRepuestos = async () => {
    try {
      const response = await fetch('../api/repuesto');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los repuestos');
      }
      const repuestosData = await response.json();
      setRepuestos(repuestosData);
    } catch (error) {
      setError('No se pudieron cargar los repuestos. Intente nuevamente más tarde.');
    }
  };

  useEffect(() => {
    fetchRepuestos();
  }, []);

  return (
    <Router>
    <div className="repuestos-list-container">
      <h1>Lista de Repuestos</h1>
      {error && <p>{error}</p>}
      <ul className="repuestos-list">
        {repuestos.map(repuesto => (
          <li key={repuesto._id} className="repuesto-item">
            <Link to="/details">
              <div className="repuesto-image-container">
                <img
                  src={repuesto.urlImg}
                  className="repuesto-image"
                  alt={`Imagen de ${repuesto.nombre}`}
                />
              </div>
              <div className="repuesto-details">
                <p className="repuesto-price">${repuesto.precio}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </Router>
  );
}

export default RepuestosList;