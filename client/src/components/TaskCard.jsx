import { useState } from "react"
import { useTasks } from "../context/TasksContext"
import { ViewModalTask } from "./ViewModalTask"
import { DeleteTaskModal } from "./DeleteTaskModal"
import { ModalUpdateTask } from "./ModalEditTask"
import { CATEGORIES } from "../const"
import { Tooltip } from "@mui/material"

export function TaskCard ({ task }) {
  const { taskStatus, formatDate } = useTasks()
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const editTask = (task) => {
    const newTask = { completed: !task.completed }
    taskStatus(newTask, task.id_task)
  }

  return (
    <>
      <ViewModalTask open={openViewModal} setOpen={setOpenViewModal} task={task}/>
      <DeleteTaskModal open={openDeleteModal} setOpen={setOpenDeleteModal} task={task}/>
      <ModalUpdateTask open={openUpdateModal} setOpen={setOpenUpdateModal} task={task}/>
      <div key={task.id_task} className={`flex flex-col justify-between gap-3 max-w-sm w-full p-4 border-2 rounded-lg hover:bg-zinc-800 ${ task.completed ? 'border-green-700': 'border-zinc-600' }`}>
        <div className="flex justify-between w-full"> 
          <div className="flex gap-x-2 items-center min-w-0 flex-1">
           <label htmlFor={`task-checkbox-${task.id_task}`} className="flex-shrink-0 flex items-center gap-2.5">
              <input onChange={() => editTask(task)} id={`task-checkbox-${task.id_task}`} type="checkbox" className="peer hidden" checked={task.completed}/>
              <div htmlFor={`task-checkbox-${task.id_task}`} className="h-5 w-5 flex rounded-xl border border-[#838383] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-green-500 peer-checked:border-green-500  transition"> <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 light:stroke-[#e8e8e8] dark:stroke-[#212121]" xmlns="http://www.w3.org/2000/svg" > <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path> </svg> </div>
            </label>      
            <Tooltip title={<span style={{ fontSize: '14px' }}>Ver Detalles de la Tarea</span>} placement="top" arrow>
              <h1 
                onClick={() => setOpenViewModal(true)} 
                className={`font-bold truncate text-lg cursor-pointer min-w-0 ${
                  task.completed ? 'text-green-500 line-through' : 'text-slate-200'
                }`}
              >
                {task.title}
              </h1>
            </Tooltip>
          </div>     
          <div className="flex-shrink-0 ml-2">
            {task.name && (
              <p className={`${CATEGORIES[task.id_category - 1].color} py-[3px] px-3 text-xs rounded-full font-bold whitespace-nowrap`}>
                {task.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex">
          <span className="text-sm text-gray-300 font-medium truncate leading-tight">{task.description}</span> 
        </div>
        <div className="flex gap-x-1">
        <svg className='fill-zinc-400' xmlns="http://www.w3.org/2000/svg"  height="18px" viewBox="0 -960 960 960" width="18px" ><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
          <span className="text-sm text-gray-400">
          { formatDate(task.due_date) }
          </span>
        </div>
        <div className="flex text-xs justify-around items-center pt-3 border-t border-zinc-500">
          <div onClick={() => setOpenUpdateModal(true)} className="flex items-center gap-x-1 hover:scale-110 duration-200 hover:cursor-pointer">
            <svg className="w-5 stroke-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <button className="font-bold text-green-500 cursor-pointer">Editar</button>
          </div>
          <div onClick={() => setOpenDeleteModal(true)} className="flex items-center gap-x-1 hover:scale-110 duration-200 hover:cursor-pointer">
            <svg className="w-5 stroke-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            <button className="font-bold text-red-500 cursor-pointer">Eliminar</button>
          </div>
        </div>
      </div>
    </>
  )
}