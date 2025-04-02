import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Loading } from "./components/Loading";
import Logo from './assets/Logo.png'

export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading className="h-screen" size={100} />

  if (!loading && isAuthenticated) return <Navigate to="/tasks" replace />

  return (
    <>
      <nav className="fixed flex items-center bg-[#242424] justify-between top-0 left-0 right-0 px-10 py-5">
        <NavLink to='/' className="flex items-center gap-x-3">
          <img className="h-auto w-[30px] rounded-sm" src={Logo} alt="Logo" />
          <h1 className="text-xl font-bold text-green-500">ToDoApp</h1>
        </NavLink>
        <div className="space-x-10">
          <NavLink to='/login' className={({ isActive }) => `text-sm py-2 cursor-pointer font-bold relative ${ isActive ? "text-green-500 after:w-full" : "text-white after:w-0 hover:text-green-400" } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-400` }>Iniciar sesion</NavLink>
          <NavLink to='/register' className={({ isActive }) => `text-sm py-2 cursor-pointer font-bold relative ${ isActive ? "text-green-500 after:w-full" : "text-white after:w-0 hover:text-green-400" } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-400` }>Registrate</NavLink>
        </div>
      </nav>
    <Outlet />
    </>
  )  
}
