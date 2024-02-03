"use client";
import { SessionProvider } from "next-auth/react";

function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export { Providers };
