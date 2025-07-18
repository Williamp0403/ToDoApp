import { useAuth } from "../context/AuthContext";
import { NavbarSecondary } from "./NavbarSecondary";

export function NavbarPrimary () {
  const { user } = useAuth()

  return (
    <nav className="sticky flex bg-zinc-800 items-center justify-between top-0 left-0 right-0 px-6 sm:px-10 py-6 z-10">
      <NavbarSecondary/>
      <h1 className="text-end font-bold text-xl">Bienvenido {user.name}</h1>
    </nav>
  )
}