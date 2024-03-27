import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function ListRepuestos() {
    const [repuestos, setRepuestos] = useState([]);
    const [marcasFiltradas, setMarcasFiltradas] = useState([]);
    const [tiposRepuestoFiltrados, setTiposRepuestoFiltrados] = useState([]);
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
            console.error('Error al obtener los repuestos:', error);
        }
    };

    useEffect(() => {
        fetchRepuestos();
    }, []);

    useEffect(() => {
        filtrar();
    }, [marcasFiltradas, tiposRepuestoFiltrados]);

    const handleMarcaCheckboxChange = (event) => {
        const marca = event.target.value;
        setMarcasFiltradas(prev => {
            if (prev.includes(marca)) {
                return prev.filter(item => item !== marca);
            } else {
                return [...prev, marca];
            }
        });
    };

    const handleTipoRepuestoCheckboxChange = (event) => {
        const tipoRepuesto = event.target.value;
        setTiposRepuestoFiltrados(prev => {
            if (prev.includes(tipoRepuesto)) {
                return prev.filter(item => item !== tipoRepuesto);
            } else {
                return [...prev, tipoRepuesto];
            }
        });
    };

    const filtrar = () => {
        let repuestosFiltradosTemp = repuestos;

        if (marcasFiltradas.length > 0) {
            repuestosFiltradosTemp = repuestosFiltradosTemp.filter(repuesto => marcasFiltradas.includes(repuesto.marca.nombre));
        }

        if (tiposRepuestoFiltrados.length > 0) {
            repuestosFiltradosTemp = repuestosFiltradosTemp.filter(repuesto => tiposRepuestoFiltrados.includes(repuesto.tipoRepuesto));
        }
        setRepuestosFiltrados(repuestosFiltradosTemp);
    };

    const marcasUnicas = [...new Set(repuestos.map(repuesto => repuesto.marca.nombre))];
    const tiposRepuestoUnicos = [...new Set(repuestos.map(repuesto => repuesto.tipoRepuesto))];

    return (
        <div>
            <h1>REPUESTOS</h1>
            <div className='container-repuesto-filter'>
                <div className='repuesto-filter'>
                    <ul>
                        <div className='title-filter'>
                            <h2>FILTRAR POR</h2>
                        </div>
                        <li>
                            <h4>Marca</h4>
                            {marcasUnicas.map(marca => (
                                <div className='cat-filter' key={marca}>
                                    <input className='input-filter'
                                        type="checkbox"
                                        id={`${marca}-marca`}
                                        value={marca}
                                        checked={marcasFiltradas.includes(marca)}
                                        onChange={handleMarcaCheckboxChange}
                                    />
                                    <label className='label-filter' htmlFor={`${marca}-marca`}><b>{marca}</b></label>
                                </div>
                            ))}
                        </li>
                        <li>
                            <h4>Tipo Repuesto</h4>
                            {tiposRepuestoUnicos.map(tipoRepuesto => (
                                <div className='cat-filter' key={tipoRepuesto}>
                                    <input className='input-filter'
                                        type="checkbox"
                                        id={`${tipoRepuesto}-tipoRepuesto`}
                                        value={tipoRepuesto}
                                        checked={tiposRepuestoFiltrados.includes(tipoRepuesto)}
                                        onChange={handleTipoRepuestoCheckboxChange}
                                    />
                                    <label className='label-filter' htmlFor={`${tipoRepuesto}-tipoRepuesto`}><b>{tipoRepuesto}</b></label>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
                <div className='repuestos-list-container'>
                    <ul className='repuestos-list'>
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
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ListRepuestos;
