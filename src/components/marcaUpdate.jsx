import { useState } from 'react';

const UpdateMarcaForm = ({ marcaId, initialDescripcion = '', onUpdate }) => {
  const [descripcion, setDescripcion] = useState(initialDescripcion);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/marcas/${marcaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marcaDescripcion: descripcion }),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data.marca);
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error updating marca:', error);
    }
  };

  return (
    <div>
      <label>
        Descripción:
        <input
          type="text"
          value={descripcion || ''} // Asegúrate de que el valor sea una cadena
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Actualizar Marca</button>
    </div>
  );
};

export default UpdateMarcaForm;
