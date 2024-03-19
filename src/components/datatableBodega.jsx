import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const BodegasList = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaEdit, setBodegaEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchBodegas = async () => {
    try {
      const response = await fetch('../api/bodega');
      const data = await response.json();
      setBodegas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteBodega = async (_id) => {
    try {
      const response = await fetch(`../api/bodega/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el bodega');
      }
      fetchBodegas();
    } catch (error) {
      setError(error.message);
    }
  };

  const editBodega = (id) => {
    const bodega = bodegas.find(bodega => bodega._id === id);
    setBodegaEdit(bodega);
  };

  const handleEditBodega = async (bodega) => {
    try {
      const response = await fetch(`../api/bodega/${bodega._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodega)
      });
      if (!response.ok) {
        throw new Error('Error al editar el bodega');
      }
      fetchBodegas();
      setBodegaEdit(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBodegas();
  }, []);

  return (
    <div className="container-table">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bodegas.map(bodega => (
            <tr key={bodega._id}>
              <td>{bodega.name}</td>
              <td>{bodega.direccion}</td>
              <td>{bodega.numPhone}</td>
              <td>
                <h5>
                  <a onClick={() => editBodega(bodega._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  <a onClick={() => deleteBodega(bodega._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {bodegaEdit && (
        <div className="Registrar datatableBodega">
          <h1>EDIT BODEGA</h1>
          <form>
            <input
              onChange={(e) => {
                setBodegaEdit({ ...bodegaEdit, name: e.target.value });
              }}
              type="text"
              placeholder="name"
              value={bodegaEdit?.name || ''}
            />
            <input
              onChange={(e) => {
                setBodegaEdit({ ...bodegaEdit, direccion: e.target.value });
              }}
              type="text"
              placeholder="direccion"
              value={bodegaEdit?.direccion || ''}
            />
            <input
              onChange={(e) => {
                setBodegaEdit({ ...bodegaEdit, numPhone: e.target.value });
              }}
              type="text"
              placeholder="numPhone"
              value={bodegaEdit?.numPhone || ''}
            />
            <button type="button" onClick={() => handleEditBodega(bodegaEdit)}>Editar Bodega</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BodegasList;