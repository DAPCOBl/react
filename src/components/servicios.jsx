import React, { useEffect , useRef} from 'react';
import M from 'materialize-css'; 

function PlanServices() {
  const collapsibleRef = useRef(null);

useEffect(() => {
  const handleCollapsibleClick = () => {
    const header = document.querySelector('.collapsible-header');
    
    if (collapsibleRef.current) {
      const elems = document.querySelectorAll('.collapsible');
      const currentElem = elems[0];

      if (collapsibleRef.current.el === currentElem) {
        if (collapsibleRef.current.isOpen) {
          header.style.color = '#FF6A00';
        } else {
          header.style.color = '#333';
        }
      }
    }
  };

  const initCollapsible = () => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});

    collapsibleRef.current = M.Collapsible.getInstance(elems[0]);

    elems[0].addEventListener('click', handleCollapsibleClick);
  };

  initCollapsible();

  return () => {
    const elems = document.querySelectorAll('.collapsible');
    const targetElem = elems[0];

    if (targetElem && handleCollapsibleClick) {
      targetElem.removeEventListener('click', handleCollapsibleClick);
    }
  };
}, []);
  return (
    <section className="plan__services">
      <h1 className="subtitle">SERVICIOS</h1>
      <ul className="plan__services collapsible" style={{ marginTop: '50px' }}>
        <li>
          <div className="collapsible-header">Reparaciones mecánicas</div>
          <div className="collapsible-body services">
            <ul className="collapsible-body-text">
              <li><img src="/IMG/Fuerza.jpg" className="imgServices" alt="Reparaciones mecánicas" /></li>
              <li className="plan__servicesDescrip">
                <div className="plan__servicesText">
                  <a className="Text">Nos encargamos de reparación o reemplazo de piezas defectuosas a desgastadas,
                    ajustes de motor, reparación de sistemas de transmisión, reparación de sistemas de escape,
                    reparación de sistemas de suspensión, y solución de problemas eléctricas</a>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header collapsible-border">Mantenimiento programado</div>
          <div className="collapsible-body services">
            <ul className="collapsible-body-text">
              <li><img src="/IMG/Peso.jpg" className="imgServices" alt="Mantenimiento programado" /></li>
              <li className="plan__servicesDescrip">
                <div className="plan__servicesText">
                  <a className="Text">Nos encargamos de cambios de aceite, cambios de filtros de aire y de aceite,
                    ajustes de la cadena de transmisión, ajustes de válvulas, limpieza de carburadores o inyectores,
                    y revisión general del sistema de frenos</a>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header">Servicio de diagnóstico</div>
          <div className="collapsible-body services">
            <ul className="collapsible-body-text">
              <li><img src="/IMG/Estiramiento.jpg" className="imgServices" alt="Servicio de diagnóstico" /></li>
              <li className="plan__servicesDescrip">
                <div className="plan__servicesText">
                  <a className="Text">Nos encargamos de identificar una falla en específico o situaciones anormales
                    donde elaboramos mediante procedimientos adecuados en los cuales plasmamos todos nuestros
                    conocimientos como especialistas en mecánica.</a>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default PlanServices;
