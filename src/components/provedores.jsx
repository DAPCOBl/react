import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const ProveedoresComponent = () => {
  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, []);

  const abrirModal = () => {
    const modal = document.getElementById('modal1');
    const instance = M.Modal.getInstance(modal);
    instance.open();
  };

  const llevarAuteco = () => {
    window.open("https://www.auteco.com.co/", "_blank");
  };

  const llevarHonda = () => {
    window.open("https://motos.honda.com.co", "_blank");
  };

  const llevarBajab = () => {
    window.open("https://colombia.globalbajaj.com/", "_blank");
  };

  return (
    <section className="Plan__Grupal" style={{ marginTop: "100px" }}>
      <div className="Plan__Grupal__container container">
        <div className="Plan__Grupal__Text">
          <h2 className="subtitle serv fontNegr">NUESTROS PROVEEDORES</h2>
          <p className="textProvee">Estos proveedores son fundamentales para asegurar que el taller tenga acceso a los recursos necesarios para llevar a cabo las reparaciones y el mantenimiento de las motocicletas de manera eficiente.</p>

          <a
            href="#modal1" 
            className="waves-effect waves-light btn modal-trigger" 
            style={{
              display: "inline-block",
              backgroundColor: "#FF6A00",
              justifySelf: "center",
              color: "#fff",
              borderRadius: "32px",
            }}
            onClick={abrirModal} 
          >
            Ver proveedores
          </a>

          <div id="modal1" className="modal bottom-sheet">
            <div id="list" style={{ display: "inline-flex", paddingTop: "10px", backgroundColor: "#333", width: "100%", height: "200px", paddingLeft: "25%", paddingTop:"40px"}}>
              <li className="spac"><img src="/IMG/Auteco.png" onClick={llevarAuteco} alt="Auteco" /></li>
              <li className="spac"><img src="/IMG/honda.png" onClick={llevarHonda} alt="Honda" /></li>
              <li className="spac"><img src="/IMG/BAJAB.png" onClick={llevarHonda} alt="Honda" /></li>
            </div>
          </div>
        </div>

        <figure className="Plan__Grupal__picture">
          <img src="/IMG/proveedores.png" className="Plan__Grupal__img" alt="Proveedores" />
        </figure>
      </div>
    </section >
  );
};

export default ProveedoresComponent;
