"use client"
import FormularioDevolucion from '../../components/devolucion';
import Datatable from '../../components/datatableDevolucion';
import React from 'react';

export default function RepuestoPage() {
  return (
    <div>
    <FormularioDevolucion/>
    <Datatable/>
    </div>
  );
}