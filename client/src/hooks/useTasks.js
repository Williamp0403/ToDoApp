import { useState } from "react"
import { createTaskRequest, deleteTaskRequest, getTasksRequest, taskStatusRequest, updateTaskRequest } from "../api/tasks"
import { useNotification } from "../components/Notification.jsx"
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { handlingErrors } from "../libs/errors.js"
dayjs.locale('es')

export const useTasks = () => {
  const [ tasks, setTasks ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ open, setOpen ] = useState(false)
  const notify = useNotification()

  const createTask = async (task, reset) => {
    try {
      const { title, description, category, due_date } = task;
      const formattedTask = { title, description, 
        category: category === "" ? null : parseInt(category),
        due_date: due_date === "" ? null : due_date,
      }
      const res = await createTaskRequest(formattedTask)
      console.log('res', res)
      getTasks()
      setOpen(false)
      reset()
      notify.success({
        message: "Tarea creada.",
        description: `La tarea fue creada exitosamente.`,
      })
    } catch (e) {
      console.log('e: ', e)
      notify.error({
        message: "Error.",
        description: handlingErrors(e),
      })
    }
  } 

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (e) {
      console.log(e)
      setTasks([])
      notify.error({
        message: "Error al cargar tareas.",
        description: handlingErrors(e)
      });
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (task, id, setOpenUpdateModal) => {
    try {
      const { title, description, category, due_date } = task
      const formattedTask = { 
        title, 
        description,
        category: category === "" ? null : parseInt(category),
        due_date: due_date === "" ? null : due_date,
      }
      const res = await updateTaskRequest(formattedTask, id)

      if (res.data.message === "No se realizaron cambios en la tarea.") {
        notify.info({
          message: "Sin cambios",
          description: "No hubo modificaciones, ya que los datos proporcionados son idénticos a los actuales.",
        })
        return
      }
  
      getTasks()
      setOpenUpdateModal(false)
      notify.success({
        message: "Tarea actualizada.",
        description: `La tarea fue actualizada exitosamente.`,
      });
    } catch (e) {
      console.log(e)
      notify.error({
        message: "Error.",
        description: handlingErrors(e)
      })
    }
  }

  const taskStatus = async (task, id) => {
    try {
      const res = await taskStatusRequest(task, id)
      console.log(res)
      getTasks()
    } catch (e) {
      console.log(e)
      notify.error({
        message: "Error.",
        description: handlingErrors(e)
      })
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      setTasks(prevState => prevState.filter((task) => task.id_task != id))
      notify.success({
        message: 'Tarea eliminada.',
        description: `La tarea fue eliminada exitosamente.`,
      })
      console.log(res)
    } catch (e) {
      console.log(e)
      notify.error({
        message: "Error.",
        description: handlingErrors(e)
      })
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha'

    const hasTime = dateString.includes(':')
    return dayjs(dateString).format(hasTime ? 'DD [de] MMMM [de] YYYY, h:mm A' : 'DD [de] MMMM, YYYY')
  }

  return { 
    tasks,
    open,
    loading,
    setTasks,
    createTask,
    getTasks,
    updateTask,
    taskStatus,
    deleteTask,
    setOpen,
    formatDate
  }
}