"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Producto() {
  const params = useParams();
  console.log(params._id);
  const [repuesto, setRepuesto] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`../api/repuesto/${params._id}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        setRepuesto(data);
        console.log('entro');
      } catch (error) {
        console.error('Error al cargar los datos del producto:', error);
      }
    }
    fetchData();
  }, [params._id]);

  return (
    <div>
      <h1>Producto</h1>
      {repuesto && (
        <>
          <h1>{repuesto.nombre}</h1>
          <p>{repuesto.descripcionRepuesto}</p>
        </>
      )}
    </div>
  );
}