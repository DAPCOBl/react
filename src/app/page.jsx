"use client"
import Heade from '../components/header'
import Sedes from '../components/sedes'
import Servicios from '../components/servicios'
import Provedores from '../components/provedores'
import Footer from '../components/footer'
import ListRepuesto from '../components/listRepuesto';
import './globals.css'


export default function Home() {

  return (
    <div>
      <Heade />
      <Sedes />
      <ListRepuesto />
      <Servicios />
      <Provedores />
      <Footer />
    </div>
  )
}
