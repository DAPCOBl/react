import RegisterForm from "../../components/registroForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; // Cambiar la importación de next/router a next/navigation
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("../dashboard");

  return <RegisterForm />;
}
