"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import M from 'materialize-css';
import Footer from '../../../components/footer';
/**import Loading from '../../../components/loader';**/

export default function Producto() {
  const params = useParams();
  const [repuesto, setRepuesto] = useState(null);
  /**const [loading, setLoading] = useState(true);**/

  useEffect(() => {
    M.AutoInit();
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

  function aparecerdesp() {
    document.getElementById('descripcion').style.display = "block";
    document.getElementById('especificacion').style.display = "none";
    document.getElementById('raya1').style.display = "block";
    document.getElementById('raya2').style.display = "none";
  }

  function aparecerespe() {
    document.getElementById('descripcion').style.display = "none";
    document.getElementById('especificacion').style.display = "block";
    document.getElementById('raya1').style.display = "none";
    document.getElementById('raya2').style.display = "block";
  }

  /**if (loading) {
    return <Loading loading={loading} />;
  }**/

  return (
    <div className="producto">
      <div className="contenido" style={{ color: 'white' }}>
        <h1>Producto</h1>
      </div>
      <img src="/IMG/Fondo.jpeg" alt="QR" />
      {repuesto && (
        <>
          <div className="details-contenedor-producto">
            <div className="details-producto">
              <div className="details-imagen">
                <img className="materialboxed" src={repuesto.urlImg} alt="" id="details-img1" />
              </div>
              <div className="info-pro">
                <div className="producto-info">
                  {repuesto.nombre}<br></br>
                  <span className="precio">${repuesto.precio}</span>
                </div>
                <h1>{repuesto.marca}</h1>
              </div>
            </div>
          </div>

          <div className="contenedor-descripcion">
            <div className="sobre">
              <h1>SOBRE EL PRODUCTO</h1>
            </div>
            <div className="cat">
              <div className="cat-descp" onClick={aparecerdesp}>
                <h3>Caracteristicas</h3>
                <div className="raya1" id="raya1"></div>
              </div>
              <div className="cat-espe" onClick={aparecerespe}>
                <h3>Especificaciones</h3>
                <div className="raya2" id="raya2"></div>
              </div>
            </div>
            <div className="details-descripcion" id="descripcion">
              <ul style={{ textAlign: 'left' }}>
                <li>Referencia: {repuesto.referencia}</li>
                <li>Modelo: {repuesto.modelo}</li>
                <li>Marca: {repuesto.marca}</li>
                <li>Tipo de Repuesto: {repuesto.tipoRepuesto}</li>
                <li>Tipo de Garantía: {repuesto.tipoGarantia}</li>
                <li>Condición: {repuesto.condicion}</li>
              </ul>
            </div>
            <div className="especificacion" id="especificacion">
              <div className="contenido1">
                <div className="parr">
                  {repuesto.descripcion}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
}
