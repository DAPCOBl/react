import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function ListRepuestos() {
    const [repuestos, setRepuestos] = useState([]);
    const [repuestosFiltrados, setRepuestosFiltrados] = useState([]);

    const fetchRepuestos = async () => {
        try {
            const response = await fetch('../api/repuesto');
            if (!response.ok) {
                throw new Error('Error al obtener los datos de los repuestos');
            }
            const repuestosData = await response.json();
            setRepuestos(repuestosData);
            setRepuestosFiltrados(repuestosData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRepuestos();
    }, []);

    return (
        <div>
            <h1>REPUESTOS</h1>
            <div className='container-repuesto-list'>
                <div className='repuestos-list'>
                    {repuestosFiltrados.map(repuesto => (
                        <li key={repuesto._id} className='repuesto-item'>
                            <Link href={`/details/${repuesto._id}/`}>
                                <div className='repuesto-image-container'>
                                    <img
                                        src={`${repuesto.urlImg}`}
                                        className='repuesto-image'
                                        alt={`Imagen de ${repuesto.nombre}`}
                                    />
                                </div>
                                <div className='repuesto-details'>
                                    <b>{repuesto.nombre}</b>
                                    <p className='repuesto-price'>${repuesto.precio}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListRepuestos;
