import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const RepuestosList = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [repuestoEdit, setRepuestoEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchRepuestos = async () => {
    try {
      const response = await fetch('../api/repuesto');
      const data = await response.json();
      setRepuestos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRepuesto = async (_id) => {
    try {
      const response = await fetch(`../api/repuesto/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el repuesto');
      }
      fetchRepuestos();
    } catch (error) {
      setError(error.message);
    }
  };

  const editRepuesto = (id) => {
    const repuesto = repuestos.find(repuesto => repuesto._id === id);
    setRepuestoEdit(repuesto);
  };

  const handleEditRepuesto = async (repuesto) => {
    try {
      const response = await fetch(`../api/repuesto/${repuesto._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(repuesto)
      });
      if (!response.ok) {
        throw new Error('Error al editar el repuesto');
      }
      fetchRepuestos();
      setRepuestoEdit(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setRepuestoEdit(null);
  };

  useEffect(() => {
    fetchRepuestos();
  }, []);

  return (
    <div className="container-table">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {repuestos.map(repuesto => (
            <tr key={repuesto._id}>
              <td>{repuesto.nombre}</td>
              
              <td>
                <h5>
                  <a onClick={() => editRepuesto(repuesto._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  <a onClick={() => deleteRepuesto(repuesto._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {repuestoEdit && (
        <div className="Registrar datatableRepuesto">
          <h1>EDITAR SERVICIO</h1>
          <form>
            <input
              onChange={(e) => {
                setRepuestoEdit({ ...repuestoEdit, nombre: e.target.value });
              }}
              type="text"
              placeholder="Nombre"
              value={repuestoEdit?.nombre || ''}
            />
            
          
            <button type="button" onClick={() => handleEditRepuesto(repuestoEdit)}>Editar Repuesto</button>
            <button type="button" onClick={handleCancelEdit}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RepuestosList;
