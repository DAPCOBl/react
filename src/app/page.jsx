"use client"
import Image from 'next/image'
import Header from '../components/header'
import Sedes from '../components/sedes'
import Servicios from '../components/servicios'
import Provedores from '../components/provedores'
import Footer from '../components/footer'
import Link from 'next/link'
import './globals.css'


export default function Home() {

  return (
    <div>
      <Header/>
      <Sedes/>
      <Servicios/>
      <Provedores/>
      <Footer/>
    </div>
  )
}
