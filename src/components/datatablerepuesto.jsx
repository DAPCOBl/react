import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const RepuestoList = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [repuestoEdit, setRepuestoEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchRepuestos = async () => {
    try {
      const response = await fetch("../api/repuesto");
      const data = await response.json();
      setRepuestos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRepuesto = async (_id) => {
    try {
      const response = await fetch(`../api/repuesto/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el repuesto");
      }
      fetchRepuestos();
    } catch (error) {
      setError(error.message);
    }
  };

  const editRepuesto = (id) => {
    const repuesto = repuestos.find((repuesto) => repuesto._id === id);
    setRepuestoEdit(repuesto);
  };

  const handleEditRepuesto = async (repuesto) => {
    try {
      const response = await fetch(`../api/repuesto/${repuesto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(repuesto),
      });
      if (!response.ok) {
        throw new Error("Error al editar el repuesto");
      }
      fetchRepuestos();
      setRepuestoEdit(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRepuestos();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>DescripcionRepuesto</th>
          <th>Referencia</th>
          <th>Precio</th>
          <th>Modelo</th>
          <th>TipoRepuesto</th>
          <th>TipoGarantia</th>
          <th>Condicion</th>
          <th>Marca</th>
          <th>Bodega</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {repuestos.map((repuesto) => (
          <tr key={repuesto._id}>
            <td>{repuesto.nombre}</td>
            <td>{repuesto.descripcionRepuesto}</td>
            <td>{repuesto.referencia}</td>
            <td>{repuesto.precio}</td>
            <td>{repuesto.modelo}</td>
            <td>{repuesto.tipoRepuesto}</td>
            <td>{repuesto.tipoGarantia}</td>
            <td>{repuesto.condicion}</td>
            <td>{repuesto.marca}</td>
            <td>{repuesto.bodega}</td>
            <td>
              <h5>
                <a onClick={() => editRepuesto(repuesto._id)}>
                  <FontAwesomeIcon icon={faPencil} />
                </a>
                <a onClick={() => deleteRepuesto(repuesto._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              </h5>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  );
  };



export default RepuestoList;