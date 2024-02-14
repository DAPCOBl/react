import React from 'react';

const Repuesto = ({ repuestos, user }) => {
    return (
        <div className="row">
            {repuestos.length > 0 ? (
                repuestos.map(repuesto => (
                    <div key={repuesto._id} className="col-md-3">
                        <div className="card">
                            <img src={repuesto.urlImg} className="card-img-top" alt={repuesto.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{repuesto.nombre}</h5>
                                <p className="card-text">{repuesto.descripcionRepuesto}</p>
                                <p className="card-text">Precio: {repuesto.precio}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="card mx-auto">
                    <div className="card-body">
                        <p className="lead">No hay repuestos registrados aún.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Repuesto;
