"use client"

import { useState, useEffect } from 'react';
import '../page.module.css';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import LoginForm from '../../components/formLogin'

export default function Login() {
  const { data: session } = useSession();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (session?.user) {
      Swal.fire({
        title: `Bienvenido ${session.user.name}!`,
        icon: 'success',
        showConfirmButton: false,
      });
      setShowWelcome(true);
    }
  }, [session]);
  return (
    <html lang="es">
      <head>
        <title>Login</title>
      </head>
      <body>
        <div class="containLogin">
          <div class="inpLogin">
            <LoginForm />
          </div>
          <div className="tituloLogin">BIENVENIDO TALLER JM</div>
          {showWelcome ? (
            <Link class="cta" href="../">Ir a la pagina</Link>
          ) : (
            <button className="cta" onClick={() => signIn('google')}>
              Acceder con Google
            </button>
          )}
        </div>
      </body>
    </html>
  );
}
