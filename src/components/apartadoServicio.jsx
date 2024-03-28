import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [servicioEdit, setServicioEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchServicios = async () => {
    try {
      const response = await fetch('../api/servicio');
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      setError(error.message);
    }
  };


  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <div className="container-table">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
           
          </tr>
        </thead>
        <tbody>
          {servicios.map(servicio => (
            <tr key={servicio._id}>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {servicioEdit && (
        <div className="Registrar datatableServicio">
          <h1>EDITAR SERVICIO</h1>
          <form>
            <input
              onChange={(e) => {
                setServicioEdit({ ...servicioEdit, nombre: e.target.value });
              }}
              type="text"
              placeholder="Nombre"
              value={servicioEdit?.nombre || ''}
            />
            <input
              onChange={(e) => {
                setServicioEdit({ ...servicioEdit, descripcion: e.target.value });
              }}
              type="text"
              placeholder="Descripción"
              value={servicioEdit?.descripcion || ''}
            />
            
   
        
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiciosList;