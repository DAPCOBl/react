"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function RegisterForm() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [numDoc, setNumDoc] = useState('');
  const [numPhone, setNumPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      obtenerUser(session.user.email);
    }
  }, [session]);

  const obtenerUser = async (email) => {
    try {
      const response = await fetch('/api/register/${email}');
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setSurname(data.surname);
        setNumDoc(data.numDoc);
        setNumPhone(data.numPhone);
      } else {
        setError('Error al obtener el usuario.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      setError('Error al obtener el usuario.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      surname,
      numDoc,
      numPhone,
    };

    try {
      const response = await fetch('api/register/${email}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const form = e.target;
        form.reset();
        router.push('/');
      } else {
        console.log('User actualizado fallido.');
      }
    } catch (error) {
      console.log('Error durante la actualización: ', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Actualizar</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            value={name}
          />
          <input
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder="Surname"
            value={surname}
          />
          <input
            onChange={(e) => setNumDoc(e.target.value)}
            type="number"
            placeholder="Número de Documento"
            value={numDoc}
          />
          <input
            onChange={(e) => setNumPhone(e.target.value)}
            type="number"
            placeholder="Número de celular"
            value={numPhone}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
          />

          <button>
            Actualizar
          </button>

          {error && (
            <div>
              {error}
            </div>
          )}

          <Link href={"/"}>
            <span>Cancelar</span>
          </Link>
        </form>
      </div>
    </div>
  );
}