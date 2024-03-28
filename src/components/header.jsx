import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { useSession, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const HeroHeader = () => {
  const { data: session } = useSession();
  const [showBye, setShowBye] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUser = async () => {
      if (!session) return;
      try {
        const response = await fetch(`/api/user/${session.user.email}`);

        if (!response.ok) {
          throw new Error('Error al obtener el usuario');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setError(error.message);
      }
    };

    obtenerUser();
  }, [session]);

  useEffect(() => {
    M.Toast.dismissAll();
  }, []);

  const handleSignOut = () => {
    signOut();
    setShowBye(true);
  };

  useEffect(() => {
    if (showBye && session?.user) {
      Swal.fire({
        title: `¡Vuelve pronto ${session.user.name}!`,
        icon: 'success',
        showConfirmButton: false,
      });
      setShowBye(false);
    }
  }, [showBye, session]);

  const infoUser = async () => {
    const result = await Swal.fire({
      title: "Información del usuario",
      icon: 'info',
      html: `<div style="text-align: left; padding-left: 45px">Name: ${session?.user?.name}<br>Email: ${session?.user?.email}</div>`,
      showCancelButton: true,
      confirmButtonText: "Edit",
      cancelButtonText: "Ok",
      confirmButtonColor: "#333",
      cancelButtonColor: "#FF6A00",
    });

    if (result.isConfirmed) {
      editUser();
    }
  };

  const editUser = () => {
    window.location.href = "/userActualizar";
  };

  const Sedes = () => {
    window.location.href = "/sede";
  };

  const Marcas = () => {
    window.location.href = "/marca";
  };

  const Servicios = () => {
    window.location.href = "/servicio";
  };

  const Repuestos = () => {
    window.location.href = "/datatableRepuesto";
  };

  const Pruebas = () => {
    window.location.href = "/prueba";
  };

  const Devolucion = () => {
    window.location.href = "/devolucion";
  };

  const Usuarios = () => {
    window.location.href = "/usuario";
  };

  return (
    <header className="hero">
      <div className="nab container">
        <div className="nab__logo">
          <h2 className="nab__title fontNegr">JM</h2>
        </div>
        <ul className="nab__link nab__link--menu">
          {session && user?.descripcionRol === 'admin' ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => Sedes()}>Sedes</a>
              </h5>
            </li>
          ) : null}
          {session && user?.descripcionRol === 'admin' ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => Marcas()}>Marcas</a>
              </h5>
            </li>
          ) : null}
          {session && user?.descripcionRol === 'admin' ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => Servicios()}>Servicios</a>
              </h5>
            </li>
          ) : null}

          {session && user?.descripcionRol === 'admin' ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => Usuarios()}>Usuarios</a>
              </h5>
            </li>
          ) : null}


          {session && user?.descripcionRol === 'jefe' ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => Repuestos()}>Repuestos</a>
              </h5>
            </li>
          ) : null}

          {session && user?.descripcionRol === 'jefe' ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => Devolucion()}>Devolucion</a>
              </h5>
            </li>
          ) : null}

          <li className="nab__items">
            <h5>
              <a onClick={() => Pruebas()}>Pruebas</a>
            </h5>
          </li>

          {session ? (
            <li className="nab__items">
              <h5>
                <a onClick={() => infoUser()}><FontAwesomeIcon icon={faUser} /></a>
              </h5>
            </li>
          ) : (
            <Link href="/login" className="cta">
              Iniciar sesión
            </Link>
          )}
        </ul>
        <div className="nab__menu">
          <img src="../../public/IMG/LOGO.png" alt="Logo" className="nab__img" />
        </div>
      </div>
      <section className="hero__container container">
        <h1 className="hero__title">Taller JM</h1>
        <p
          className="hero__paragraph"
          style={{ color: 'white', fontSize: '22px' }}
        >
          Empresa especializada en las motocicletas, tanto la parte de
          mantenimiento y reparación, como el área de venta de repuestos y
          accesorios
        </p>
        {session ? (

          <button onClick={() => handleSignOut()} className="cta">
            Cerrar sesión
          </button>
        ) : (
          <Link href="/login" className="cta">
            Iniciar sesión
          </Link>
        )}
      </section>
    </header>
  );
};

export default HeroHeader;
