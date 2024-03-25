import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


const DevolucionList = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [devolucionEdit, setDevolucionEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchDevoluciones = async () => {
    try {
      const response = await fetch('../api/devolucion');
      const data = await response.json();
      setDevoluciones(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteDevolucion = async (_id) => {
    try {
      const response = await fetch(`../api/devolucion/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el devolucion');
      }
      fetchDevoluciones();
    } catch (error) {
      setError(error.message);
    }
  };

  const editDevolucion = (id) => {
    const devolucion = devoluciones.find(devolucion => devolucion._id === id);
    setDevolucionEdit(devolucion);
  };

  const handleEditDevolucion = async (devolucion) => {
    try {
      const response = await fetch(`../api/devolucion/${devolucion._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(devolucion)
      });
      if (!response.ok) {
        throw new Error('Error al editar el devolucion');
      }
      fetchDevoluciones();
      setDevolucionEdit(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDevoluciones();
  }, []);

  return (
    <div className="container-table">
      <table className="table">
        <thead>
          <tr>
            <th>FechaDevolucion</th>
            <th>MotivoDevolucion</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(devoluciones) && devoluciones.map(devolucion => (
            <tr key={devolucion._id}>
              <td>{devolucion.FechaDevolucion}</td>
              <td>{devolucion.MotivoDevolucion}</td>
              <td>
                <h5>
                  <a onClick={() => editDevolucion(devolucion._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  <a onClick={() => deleteDevolucion(devolucion._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {devolucionEdit && (
        <div className="Registrar datatableDevolucion">
          <h1>EDIT DEVOLUCION</h1>
          <form>
          <input
              onChange={(e) => {
                setDevolucionEdit({ ...devolucionEdit, FechaDevolucion: e.target.value });
              }}
              type="text"
              placeholder="FechaDevolucion"
              value={devolucionEdit?.FechaDevolucion || ''}
            />
            <input
              onChange={(e) => {
                setDevolucionEdit({ ...devolucionEdit, MotivoDevolucion: e.target.value });
              }}
              type="text"
              placeholder="MotivoDevolucion"
              value={devolucionEdit?.MotivoDevolucion || ''}
            />
            <button type="button" onClick={() => handleEditDevolucion(devolucionEdit)}>Editar Devolucion</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DevolucionList;
