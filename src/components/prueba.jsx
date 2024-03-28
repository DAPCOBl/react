import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { useSession } from 'next-auth/react';

const HeroHeader = () => {
    const { data: session } = useSession();
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

    

    return (
        <header className="hero">
            <div className="nab container">
                <div className="nab__logo">
                    <h2 className="nab__title fontNegr">JM</h2>
                </div>
                <h1>{user?.name}</h1>
                <h1>{user?.descripcionRol}</h1>
                <ul className="nab__link nab__link--menu">
                    
                </ul>
            </div>
        </header>
    );
};

export default HeroHeader;
