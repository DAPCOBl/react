"use client"

import React, { useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import $ from 'jquery';
import DataTable from 'datatables.net';
import UserInfo from "../../components/userInfo";
import Marca from "../../components/marcaCreate";

import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';

const Home = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      const table = $(tableRef.current).DataTable({
        dom: 'Bfrtip', 
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print',
        ],
      });
      return () => {
        table.destroy();
      };
    }
  }, []);

  return (
    <div>
      <UserInfo />
      <h1 style={{ marginLeft: "35%" }}>LA CONTRASEÑA ES 123</h1>
      <div style={{ width: '80%', marginLeft: "10%" }}>
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Marca</th>
              <th>Proveedor</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MD423</td>
              <td>Dominar</td>
              <td>Auteco</td>
              <td>10.500</td>
            </tr>
            <tr>
              <td>COR123</td>
              <td>Pulsar</td>
              <td>Bajab</td>
              <td>65.800</td>
            </tr>
            <tr>
              <td>kA532</td>
              <td>TTR</td>
              <td>AKT</td>
              <td>125.000</td>
            </tr>
            <tr>
              <td>EE32</td>
              <td>NKD</td>
              <td>AKT</td>
              <td>150.000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <a className="cta" href="../">Ir a la página</a>
      <h1 style={{ marginTop: "60px" }}>hola</h1>
      <Marca />
    </div>
  );
};

export default Home;
