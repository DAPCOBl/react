import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsRepuesto from '../../components/DetailsRepuesto';

export default function RepuestoPage() {
  const { id } = useParams();
  return (
    <div>
      <DetailsRepuesto id={id} />
    </div>
  );
}
