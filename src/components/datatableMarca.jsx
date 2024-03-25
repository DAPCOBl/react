// Importa useState y useEffect desde React para manejar el estado y los efectos secundarios
import { useState, useEffect } from 'react';
// Importa FontAwesomeIcon para utilizar íconos de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importa íconos específicos de FontAwesome
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
// Importa useRouter desde next/navigation para manejar la navegación en Next.js
import { useRouter } from 'next/navigation';

// Definición del componente MarcasList
const MarcasList = () => {
  // Estado para almacenar las marcas
  const [marcas, setMarcas] = useState([]);
  // Estado para almacenar la marca que se está editando
  const [marcaEdit, setMarcaEdit] = useState(null);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Hook useRouter para obtener la instancia del router
  const router = useRouter();

  // Función para obtener las marcas desde la API
  const fetchMarcas = async () => {
    try {
      // Hace una solicitud GET a la API
      const response = await fetch('../api/marca'); 
      // Parsea la respuesta a JSON
      const data = await response.json(); 
      // Actualiza el estado de las marcas con los datos obtenidos
      setMarcas(data); 
    } catch (error) {
      // Maneja errores
      setError(error.message); 
    }
  };

  // Función para eliminar una marca
  const deleteMarca = async (_id) => {
    try {
      // Hace una solicitud DELETE a la API
      const response = await fetch(`../api/marca/${_id}`, { 
        method: 'DELETE',
      });
      if (!response.ok) {
         // Maneja errores
        throw new Error('Error al eliminar la marca');
      }
       // Vuelve a obtener las marcas después de eliminar
      fetchMarcas();
    } catch (error) {
      // Maneja errores
      setError(error.message); 
    }
  };

  // Función para editar una marca
  const editMarca = (id) => {
     // Encuentra la marca por su ID
    const marca = marcas.find(marca => marca._id === id);
    // Establece la marca a editar en el estado
    setMarcaEdit(marca); 
  };

  // Función para manejar la edición de una marca
  const handleEditMarca = async (marca) => {
    try {
      // Hace una solicitud PUT a la API
      const response = await fetch(`../api/marca/${marca._id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // Envía los datos de la marca actualizada
        body: JSON.stringify(marca) 
      });
      if (!response.ok) {
        // Maneja errores
        throw new Error('Error al editar la marca'); 
      }
      // Vuelve a obtener las marcas después de editar
      fetchMarcas(); 
       // Limpia la marca editada
      setMarcaEdit(null);
    } catch (error) {
      // Maneja errores
      setError(error.message); 
    }
  };

  // Efecto para obtener las marcas cuando el componente se monta
  useEffect(() => {
    fetchMarcas();
    // El segundo argumento [] indica que solo se ejecuta una vez al montar el componente
  }, []); 

  // Renderizado del componente
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
                  {/* Botón de edición */}
                  <a onClick={() => editMarca(marca._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  {/* Botón de eliminación */}
                  <a onClick={() => deleteMarca(marca._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Formulario para editar la marca */}
      {marcaEdit && (
        <div className="Registrar datatableMarca">
          <h1>EDIT MARCA</h1>
          <form>
            {/* Input para el nombre de la marca */}
            <input
              onChange={(e) => {
                setMarcaEdit({ ...marcaEdit, nombre: e.target.value });
              }}
              type="text"
              placeholder="nombre"
              value={marcaEdit?.nombre || ''}
            />
            {/* Botón para editar la marca */}
            <button type="button" onClick={() => handleEditMarca(marcaEdit)}>Editar Marca</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MarcasList; // Exporta el componente MarcasList
