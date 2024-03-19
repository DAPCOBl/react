"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function RegisterForm() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (session) {
      obtenerUser(session.user.email);
    }
  }, [session]);
//
  const UserEdit = (email) => {
    const user = users.find(user => user.email === email);
    setBodegaEdit(prevState => ({ ...prevState, ...user }));
  };

  const UserEditSend = async (userEdit) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${userEdit.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userEdit)
      });
      if (!response.ok) {
        throw new Error('Error al editar el user');
      }
      const updatedBodega = await response.json();
      fetchBodegas();
      setBodegaEdit(null);
    } catch (error) {
    }
  };

  return (
    <div className="Registrar-Bodega">
      <div className="Registrar Bodega">
        <h1>Actualizar</h1>
        {UserEdit && (
      <div className="Registrar datatableBodega">
        <h1>EDIT BODEGA</h1>
        <form>
          <input
            onChange={(e) => setBodegaEdit(prevState => ({ ...prevState, name: e.target.value }))}
            type="text"
            placeholder="name"
            value={UserEdit.name}
          />
          <input
            onChange={(e) => setBodegaEdit(prevState => ({ ...prevState, surname: e.target.value }))}
            type="text"
            placeholder="surname"
            value={UserEdit.surname}
          />
          <input
            onChange={(e) => setBodegaEdit(prevState => ({ ...prevState, numDoc: e.target.value }))}
            type="text"
            placeholder="numDoc"
            value={UserEdit.numDoc}
          />
          <input
            onChange={(e) => setuserEdit(prevState => ({ ...prevState, numPhone: e.target.value }))}
            type="text"
            placeholder="numPhone"
            value={UserEdit.numPhone}
          />
          <button onClick={() => UserEditSend(user._id)} type="submit">Editar Bodega</button>
        </form>
      </div>
      )}
          {error && (
            <div>
              {error}
            </div>
          )}

          <Link href={"/"}>
            <span>Cancelar</span>
          </Link>
      </div>
    </div>
  );
}