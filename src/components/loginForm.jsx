"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await signIn("google", { redirect: false });
  
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      const userData = res?.user;
  
      await saveUserDataToMongoDB(userData);
      router.replace("admin");
    } catch (error) {
      console.log(error);
    }
  };
  
  const saveUserDataToMongoDB = async (userData) => {
    try {
      
      await User.create({
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      console.error("Error al guardar los datos del usuario en MongoDB:", error);
    }
  };
  

  return (
    <div>
      
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
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
          <button>
            Login
          </button>
          {error && (
            <div>
              {error}
            </div>
          )}

          <Link href={"/register"}>
            No tienes cuenta? <span className="underline">Registrate</span>
          </Link>
        </form>
      </div>
    </div>
  );
}