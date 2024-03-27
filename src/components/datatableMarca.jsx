import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const MarcasList = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaEdit, setMarcaEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchMarcas = async () => {
    try {
      const response = await fetch('../api/marca'); 
      const data = await response.json(); 
      setMarcas(data); 
    } catch (error) {
      setError(error.message); 
    }
  };

  const deleteMarca = async (_id) => {
    try {
      const response = await fetch(`../api/marca/${_id}`, { 
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la marca');
      }
      fetchMarcas();
    } catch (error) {
      setError(error.message); 
    }
  };

  const editMarca = (id) => {
    const marca = marcas.find(marca => marca._id === id);
    setMarcaEdit(marca); 
  };

  const handleEditMarca = async (marca) => {
    try {
      const response = await fetch(`../api/marca/${marca._id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(marca) 
      });
      if (!response.ok) {
        throw new Error('Error al editar la marca'); 
      }
      fetchMarcas(); 
      setMarcaEdit(null);
    } catch (error) {
      setError(error.message); 
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []); 

  return (
    <div className="container-table">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map(marca => (
            <tr key={marca._id}>
              <td>{marca.nombre}</td>
              <td>
                <h5>
                  <a onClick={() => editMarca(marca._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  <a onClick={() => deleteMarca(marca._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {marcaEdit && (
        <div className="Registrar datatableMarca">
          <h1>EDIT MARCA</h1>
          <form>
            <input
              onChange={(e) => {
                setMarcaEdit({ ...marcaEdit, nombre: e.target.value });
              }}
              type="text"
              placeholder="nombre"
              value={marcaEdit?.nombre || ''}
            />
            <button type="button" onClick={() => handleEditMarca(marcaEdit)}>Editar Marca</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MarcasList;