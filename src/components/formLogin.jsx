"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Login invalido",
        text: "Rellene  todos los campos.",
      });
      return;
    }
  
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
  
      if (res.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario invalido"
        });
        return;
      }
      
      router.replace("../");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
          />
          <button class="button-login" type="submit">Login</button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
}