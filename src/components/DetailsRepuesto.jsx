import { useState, useEffect } from 'react';
import M from 'materialize-css';
import Loading from '../components/loader';
import Footer from '../components/footer';

export default function Producto({ id }) {
    const [repuesto, setRepuesto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerRepuesto(id);
        M.AutoInit();
    }, [id]);

    async function obtenerRepuesto(id) {
        try {
            const response = await fetch(`repuesto/${id}`);
            const data = await response.json();
            setRepuesto(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener el repuesto:', error);
            setLoading(false);
        }
    }

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

    if (loading) {
        return <Loading loading={loading} />;
    }

    if (!repuesto) {
        return <div>Repuesto no encontrado</div>;
    }

    return (
        <>
            <div className="details-contenedor-producto">
                <div className="details-producto">
                    <div className="details-imagen">
                        <img className="materialboxed" src={repuesto.urlImg} alt="" id="details-img1" />
                    </div>
                    <div className="info-pro">
                        <h5>{repuesto.nombre}</h5>
                        <h1>{repuesto.marca}</h1>
                        <h2>{repuesto.precio}</h2>
                    </div>
                </div>
            </div>

            <div className="contenedor-descripcion">
                <div className="sobre">
                    <h1>SOBRE EL PRODUCTO</h1>
                </div>
                <div className="cat">
                    <div className=" cat-descp" onClick={aparecerdesp}>
                        <h3>Caracteristicas</h3>
                        <div className="details-raya1" id="raya1"></div>
                    </div>
                    <div className=" cat-espe" onClick={aparecerespe}>
                        <h3>ESPECIFICACIONES</h3>
                        <div className="details-raya2" id="raya2"></div>
                    </div>
                </div>
                <div className="details-descripcion" id="descripcion">
                    <ul>
                        <p>Referencia: {repuesto.referencia}</p>
                        <p>Modelo: {repuesto.modelo}</p>
                        <p>Marca: {repuesto.marca}</p>
                        <p>Tipo de Repuesto: {repuesto.tipoRepuesto}</p>
                        <p>Tipo de Garantía: {repuesto.tipoGarantia}</p>
                        <p>Condición: {repuesto.condicion}</p>
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
            <Footer/>
        </>        
    );
}
