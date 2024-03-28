"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import RegisterForm from '../../components/formRepuesto';

const HeroHeader = () => {
 const { data: session } = useSession();
 const [user, setUser] = useState(null);
 const [error, setError] = useState(null);

 const router = useRouter();

 const validarRol = () => {
    router.push("../");
 };

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

 return (
    <div>
      {user && user.descripcionRol !== 'admin' ? (
        <RegisterForm />
      ) : (
        validarRol()
      )}
    </div>
 );
};

export default HeroHeader;
