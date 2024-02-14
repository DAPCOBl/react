"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !numPhone || !numDoc || !email || !password) {
      setError("All fields are necessary.");
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
        setError("User already exists.");
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
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Register</h1>

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
          <button >
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