import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import { ModalCreateTask } from "./ModalCreateTask";
import { NavbarSecondary } from "./NavbarSecondary";

export function NavbarPrimary () {
  const { user } = useAuth()
  const { setOpen, open } = useTasks()

  return (
    <nav className="fixed flex bg-[#242424] items-center justify-between top-0 left-0 right-0 px-10 py-4 z-10">
      <NavbarSecondary/>
      <div className="flex items-center gap-x-5">
        <button onClick={() => setOpen(true)} className="py-2 px-4 bg-transparent text-green-400 border border-green-400 rounded-lg font-bold hover:bg-green-400 hover:text-zinc-900 transition ease-in-out duration-500 cursor-pointer">+ Agregar tarea</button>
        <h1 className="text-end font-bold text-xl">Bienvenido {user.name}</h1>
      </div>
      <ModalCreateTask open={open} setOpen={setOpen} />
    </nav>
  )
}