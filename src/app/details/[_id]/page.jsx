"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Producto() {
  const { repuestoId } = useParams();
  console.log('ID del producto:', repuestoId);
  const [repuesto, setRepuesto] = useState(null);

 useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/repuestos/${repuestoId}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        setRepuesto(data);
      } catch (error) {
        console.error('Error al cargar los datos del producto:', error);
      }
    }
    fetchData();
 }, [repuestoId]); 

 if (!repuesto) {
    return <div>Loading...</div>;
 }

 return (
    <div>
      <h1>{repuesto.nombre}</h1> {/* Asegúrate de que el nombre de la propiedad coincida con los datos que estás recibiendo */}
      <p>{repuesto.descripcion}</p> {/* Asegúrate de que el nombre de la propiedad coincida con los datos que estás recibiendo */}
    </div>
 );
}