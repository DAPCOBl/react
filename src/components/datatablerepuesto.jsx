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
    <div>
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
            <td>{repuesto.marca?.nombre}</td>
            <td>{repuesto.bodega?.sede}</td>
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
    {repuestoEdit && (
      <div className="Registrar datatableRepuesto">
        <h1>EDIT REPUESTO</h1>
        <form>
        <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, nombre: e.target.value });
            }}
            type="text"
            placeholder="Nombre"
            value={repuestoEdit?.nombre || ''}
          />
          <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, descripcionRepuesto: e.target.value });
            }}
            type="text"
            placeholder="DescripcionRepuesto"
            value={repuestoEdit?.descripcionRepuesto || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, referencia: e.target.value });
            }}
            type="text"
            placeholder="Referencia"
            value={repuestoEdit?.referencia || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, precio: e.target.value });
            }}
            type="text"
            placeholder="Precio"
            value={repuestoEdit?.precio || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, modelo: e.target.value });
            }}
            type="text"
            placeholder="Modelo"
            value={repuestoEdit?.modelo || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, tipoRepuesto: e.target.value });
            }}
            type="text"
            placeholder="TipoRepuesto"
            value={repuestoEdit?.tipoRepuesto || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, tipoGarantia: e.target.value });
            }}
            type="text"
            placeholder="TipoGarantia"
            value={repuestoEdit?.tipoGarantia || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, condicion: e.target.value });
            }}
            type="text"
            placeholder="Condicion "
            value={repuestoEdit?.condicion || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, marca: e.target.value });
            }}
            type="text"
            placeholder="Marca"
            value={repuestoEdit?.marca?.nombre || ''}
          />
           <input
            onChange={(e) => {
              setRepuestoEdit({ ...repuestoEdit, bodega: e.target.value });
            }}
            type="text"
            placeholder="Bodega"
            value={repuestoEdit?.bodega?.sede || ''}
          />
          <button type="button" onClick={() => handleEditRepuesto(repuestoEdit)}>Editar Repuesto</button>
        </form>
      </div>
    )}
    </div>
);
};

export default RepuestoList;