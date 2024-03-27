import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await fetch('../api/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteUser = async (_id) => {
    try {
      const response = await fetch(`../api/user/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el user');
      }
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const editUser = (id) => {
    const user = users.find(user => user._id === id);
    setUserEdit(user);
  };

  const handleEditUser = async (user) => {
    try {
      const response = await fetch(`../api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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

  const handleCancelEdit = () => {
    setUserEdit(null);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              
              <td>
                <h5>
                  <a onClick={() => editUser(user._id)}><FontAwesomeIcon icon={faPencil} /></a>
                  <a onClick={() => deleteUser(user._id)}><FontAwesomeIcon icon={faTrash} /></a>
                </h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userEdit && (
        <div className="Registrar datatableUser">
          <h1>EDITAR REPUESTO</h1>
          <form>
            <input
              onChange={(e) => {
                setUserEdit({ ...userEdit, nombre: e.target.value });
              }}
              type="text"
              placeholder="Nombre"
              value={userEdit?.nombre || ''}
            />
            
            <button type="button" onClick={() => handleEditUser(userEdit)}>Editar User</button>
            <button type="button" onClick={handleCancelEdit}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersList;
