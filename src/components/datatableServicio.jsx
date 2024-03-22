import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
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

  const deleteServicio = async (_id) => {
    try {
      const response = await fetch(`../api/servicio/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el servicio');
      }
      fetchServicios();
    } catch (error) {
      setError(error.message);
    }
  };

  const editServicio = (id) => {
    const servicio = servicios.find(servicio => servicio._id === id);
    setServicioEdit(servicio);
  };

  const handleEditServicio = async (servicio) => {
    try {
      const response = await fetch(`../api/servicio/${servicio._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicio)
      });
      if (!response.ok) {
        throw new Error('Error al editar el servicio');
      }
      fetchServicios();
      setServicioEdit(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setServicioEdit(null);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map(servicio => (
            <tr key={servicio._id}>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
              <td>
                <h5>
                  <a onClick={() => editServicio(servicio._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  <a onClick={() => deleteServicio(servicio._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
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
            <input
              onChange={(e) => {
                setServicioEdit({ ...servicioEdit, acciones: e.target.value });
              }}
              type="text"
              placeholder="Acciones"
              value={servicioEdit?.acciones || ''}
            />
            <button type="button" onClick={() => handleEditServicio(servicioEdit)}>Editar Servicio</button>
            <button type="button" onClick={handleCancelEdit}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiciosList;
