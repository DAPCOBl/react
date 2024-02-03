import { useState } from "react";

const DeleteButton = ({ _id, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    console.log("URL:", `/api/marca/${_id}`); // Agrega esta línea para verificar la URL
    setIsDeleting(true);
  
    try {
      const res = await fetch(`/api/marca/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        onDelete(_id);
      } else if (res.status === 404) {
        console.error(_id +"Marca no encontrada para eliminar.");
      } else {
        console.error("Error al eliminar la Marca");
      }
    } catch (error) {
      console.error("Error al eliminar la Marca:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Eliminando..." : "Eliminar"}
    </button>
  );
};

export default DeleteButton;
