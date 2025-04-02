import { Link } from 'react-router-dom'
import img from '../assets/Tasks.png'

export function HomePage () {
  return (
    <>
    <section className="pt-35 font-bold">
      <div className="flex gap-x-6 h-96">
        <div className="space-y-7">
          <h1 className="text-6xl tracking-wide">Administra tus tareas con <span className="text-green-500">ToDoApp.</span></h1>
          <p className="text-xl text-gray-400 tracking-wide">Organiza tus actividades del día a día de manera fácil, rápida y segura, nunca olvides una cita importante, un proyecto o cualquier actividad clave.</p>
          <div className='flex justify-center mt-10'>
            <Link to='/login'><button className="w-[170px] py-3 bg-transparent text-green-400 border border-green-400 rounded-lg font-bold hover:bg-green-400 hover:text-zinc-900 transition ease-in-out duration-500 cursor-pointer">Empezar</button></Link>
          </div>
        </div>
        <img className="h-auto w-3xl border-2 border-green-400 py-5 rounded-xl shadow-2xl shadow-green-500" src={img} alt="Tasks" />  
      </div>
    </section>
    </>
  )
}