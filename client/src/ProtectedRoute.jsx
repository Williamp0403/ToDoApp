import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { Loading } from "./components/Loading"
import { NavbarPrimary } from "./components/NavbarPrimary"

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Loading className="h-screen" size={100}/>

  if (!loading && !isAuthenticated) return <Navigate to='/' replace />

  return (
    <>
      <NavbarPrimary />
      <Outlet />
    </>
  );
}
