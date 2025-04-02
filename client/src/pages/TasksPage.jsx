import { useEffect } from "react"
import { TaskCard } from "../components/TaskCard"
import { useTasks } from "../context/TasksContext"
import { Loading } from "../components/Loading.jsx"
import AccordionUsage from "../components/Accordion.jsx"
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import dayjs from "dayjs"

export function TasksPage () {
  const { getTasks, tasks, setOpen, loading } = useTasks()
  const today = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    getTasks()
  }, [])

  const isTasks = tasks?.length > 0

  const todayTasks = tasks.filter(task => {
    if (!task.due_date) return false
    return dayjs(task.due_date).format('YYYY-MM-DD') === today
  })

  const overdueTasks = tasks.filter(task => {
    if (!task.due_date) return false
    return dayjs(task.due_date).isBefore(today) && !task.completed
  })

  const upComingTasks = tasks.filter(task => {
    if (!task.due_date) return false
    return dayjs(task.due_date).isAfter(today)
  })

  const unDatedTasks = tasks.filter(task =>  !task.due_date )

  return (
    <section className="py-25 px-7 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Mis Tareas</h1>
      {
        loading ? <Loading/>
        : isTasks && !loading ? 
        <div className="space-y-4">
          <AccordionUsage expanded={true} title='Tareas de hoy' data={todayTasks} icon={<TodayOutlinedIcon/>} color='transparent' textColor='#3b82f6'/>
          <AccordionUsage data={overdueTasks} title='Tareas atrasadas' icon={<InfoOutlinedIcon/>} color='transparent' textColor='#ef4444'/>
          <AccordionUsage data={upComingTasks} title='Próximas tareas' icon={<DateRangeOutlinedIcon/>} color='transparent' textColor='#22c55e'/>
          <AccordionUsage data={unDatedTasks} title='Tareas sin fecha' icon={<EventBusyOutlinedIcon/>} color='transparent' textColor='#8b5cf6'/>
        </div>
        : <h1>No hay tareas, <span onClick={() => setOpen(true)} className="font-bold text-green-500 cursor-pointer">Crear nueva tarea</span></h1>
      }
    </section>
  )
}