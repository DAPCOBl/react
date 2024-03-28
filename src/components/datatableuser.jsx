import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const UsersList = () => {
  const [user, setUser] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const [descriptionRol, setDescriptionRol] = useState(''); 
  const [estado, setEstado] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  

  const fetchUsers = async () => {
    try {
      const response = await fetch('../api/user');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const editUser = (id) => {
    const usuarioEditado = user.find(u => u._id === id);
    setUserEdit(usuarioEditado);
    if (usuarioEditado && usuarioEditado.rol !== null && typeof usuarioEditado.rol === 'object') {
      setDescriptionRol(usuarioEditado.rol.descripcionRol || '');
      setEstado(usuarioEditado.rol.estado || '');
     } else {
      setDescriptionRol('');
      setEstado('');
     }
   };

  const handleEditUser = async (user) => {
    try {
      const response = await fetch(`../api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rol: {
            descripcionRol: descriptionRol, 
            estado: estado
          }
        })
      });
      if (!response.ok) {
        throw new Error('Error al editar el user');
      }
      fetchUsers();
      setUserEdit(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="container-table">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {user.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.numPhone}</td>
              <td>{user.email}</td>
              <td>{user.descripcionRol}</td>
              <td>{user.estado}</td>
              <td>
                <h5>
                  <a onClick={() => editUser(user._id)}><FontAwesomeIcon icon={faPencil} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userEdit && (
        <div className="Registrar datatableUser">
          <h1></h1>
          <form>
            <select
              onChange={(e) => setDescriptionRol(e.target.value)}
              name="DescriptionRol">
              <option value="">Selecciona un rol</option>
              <option value="jefe">Jefe</option>
              <option value="admin">Admin</option>
              <option value="client">Cliente</option>
            </select>
            <button type="button" onClick={() => handleEditUser(userEdit)}>Editar usuario</button>          </form>
        </div>
      )}
    </div>
  );
};

export default UsersList;
