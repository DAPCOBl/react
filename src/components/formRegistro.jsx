"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [accept, setAccept] = useState(false); 
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accept) {
      Swal.fire({
        icon: "warning",
        title: "Terminos y condiciones",
        text: "Debes aceptar los términos y condiciones.",
      });
      return;
    }

    if (!name || !surname || !numPhone || !numDoc || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Registro invalido",
        text: "Rellene  todos los campos.",
      });
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        Swal.fire({
          icon: "warning",
          title: "Registro invalido",
          text: "Usuario ya registrado"
        });
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          numDoc,
          numPhone,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registrado fallido.");
      }
    } catch (error) {
      console.log("Error durante el registro: ", error);
    }
  };

  return (
    <div>

    <div className="REGISTRO">
      <h1>REGISTRO</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          placeholder="Surname"
        />
        <input
          onChange={(e) => setNumDoc(e.target.value)}
          type="number"
          placeholder="Número de Documento"
        />
        <input
          onChange={(e) => setNumPhone(e.target.value)}
          type="number"
          placeholder="Número de celular"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <label>
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
          />
          Aceptar terminos y condiciones
          <Link href={"https://docs.google.com/document/d/1cKQA_UCWIydGg9bC0FvDXBpeV-iScx_11a9XxwyceyE/edit?usp=sharing"}>
          Terminos y condiciones
        </Link>
        </label>

        <button>
          Registrate
        </button>

        {error && (
          <div>
            {error}
          </div>
        )}

        <Link href={"/"}>
          Ya tienes cuenta? <span>Login</span>
        </Link>
      </form>
    </div>
  </div>
);
}