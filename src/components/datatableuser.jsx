import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const UsersList = () => {
  const [user, setUser] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
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
          <th>rol</th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(user) && user.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.numPhone}</td>
            <td>{user.email}</td>
            <td>{user.rol}</td>
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
        <h1>EDIT USUARIO</h1>
        <form>
          <input
            onChange={(e) => {
              setUserEdit({ ...UserEdit, name: e.target.value });
            }}
            type="text"
            placeholder="Nombre"
            value={userEdit?.name || ''}
          />
          
          <input
            onChange={(e) => {
              setUserEdit({ ...UserEdit, numPhone: e.target.value });
            }}
            type="text"
            placeholder="Telefono"
            value={userEdit?.numPhone || ''}
          />
             <input
            onChange={(e) => {
              setUserEdit({ ...UserEdit, email: e.target.value });
            }}
            type="text"
            placeholder="Email"
            value={userEdit?.email || ''}
          />
          <button type="button" onClick={() => handleEditUser(UserEdit)}>Editar usuario</button>
        </form>
      </div>
    )}
  </div>
  );
};

export default UsersList;
