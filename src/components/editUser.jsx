import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const UserDetails = () => {
    const { data: session } = useSession();
    const router = useRouter();
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-table">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            
        </div>
    );
};

export default UserDetails;
