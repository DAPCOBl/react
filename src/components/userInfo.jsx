"use client";

import React, { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';

export default function UserInfo() {
  const { data: session } = useSession();
  const [showBye, setShowBye] = useState(false);

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

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button onClick={() => handleSignOut()} className="cta">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}