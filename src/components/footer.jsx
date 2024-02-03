import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../app/globals.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="company-name">MOTOS Y SERVICIOS DEL SUR JM</p>
      <ul className="footer-redes">
      <li><a href="https://www.facebook.com/profile.php?id=100070741513065"><FontAwesomeIcon icon={faFacebook} /></a></li>
        <li><a href="https://instagram.com/motosyserviciosj.m?utm_source=qr&igshid=OGU0MmVlOWVjOQ=="><FontAwesomeIcon icon={faInstagram} /></a></li>
      </ul>
      <hr />
      <p>© 2023 Todos los derechos reservados | Taller JM</p>
      <p>NIT 1098308671&nbsp;&nbsp;|&nbsp;&nbsp;Car.14 # 68B 93 SUR&nbsp;&nbsp; |&nbsp;&nbsp; Bogotá, Colombia</p>
    </footer>
  );
};

export default Footer;
