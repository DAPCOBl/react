"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import LoginForm from '../../components/formLogin'

export default function Login() {
  const { data: session } = useSession();
  const [showWelcome, setShowWelcome] = useState(false);

  const Page = () => {
    window.location.href = "/..";
  };

  useEffect(() => {
    if (session?.user) {
      Swal.fire({
        title: `Bienvenido ${session.user.name}!`,
        icon: 'success',
        showConfirmButton: false,
      });
      setShowWelcome(true);
      Page();
    }
  }, [session]);
  return (
    <html lang="es">
      <body>
        <div class="containLogin">
          <div class="inpLogin">
            <LoginForm />
          </div>
          <div className="tituloLogin">BIENVENIDO TALLER JM
          <Link href={"/register"}  class="register-button" >No tienes cuenta? <span>Registrate</span></Link>
          </div>
          {showWelcome ? (
       <Link class="Boton-Google" href="../">Ir a la página</Link>
          ) : (
            <button className="Boton-Google" onClick={() => signIn('google')}>
              Acceder con Google
            </button>
          )}
        </div>
      </body>
    </html>
  );
}