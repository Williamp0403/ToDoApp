import { Link } from 'react-router-dom'
import img from '../assets/Tasks.png'

export function HomePage () {
  return (
    <section className="grid md:grid-cols-2 min-h-[calc(100vh-86px)] items-center p-6 md:p-10">
      <div className="flex flex-col md:gap-y-8 gap-y-4 h-full md:px-5 w-full max-w-2xl">
        <h1 className="text-4xl sm:text-6xl md:text-6xl tracking-wide font-bold">
          Administra tus tareas del dia a dia con <span className="text-green-500">ToDoApp.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 tracking-wide font-medium">
          Organiza tus actividades del día a día de manera fácil, rápida y segura, nunca olvides una cita importante, un proyecto o cualquier actividad clave.
        </p>
        <div className='flex justify-center '>
          <Link to='/login'>
            <button className="w-40 md:w-[170px] py-2 md:py-3 bg-transparent text-green-400 border border-green-400 rounded-lg font-bold hover:bg-green-400 hover:text-zinc-900 transition ease-in-out duration-500 cursor-pointer">
              Empezar
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <img 
          className="w-full max-w-lg border-2 border-green-400 rounded-xl shadow-2xl shadow-green-500" 
          src={img} 
          alt="Tasks" 
        />  
      </div>
    </section>
  )
}