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
    <div>
      <div>
        <div>
          Name: <span>{session?.user?.name}</span>
        </div>
        <div>
          Email: <span>{session?.user?.email}</span>
        </div>
        <button onClick={() => handleSignOut()} className="cta">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}