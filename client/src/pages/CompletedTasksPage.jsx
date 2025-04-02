import { useEffect } from "react"
import { useTasks } from "../context/TasksContext"
import { TaskCard } from "../components/TaskCard"
import { Loading } from "../components/Loading"

export function CompletedTasksPage () {
  const { tasks, getTasks, loading } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  const isTasksCompleted = tasks.some((task) => task.completed)

  return (
    <section className="py-25 px-10 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Tareas completadas</h1>
        {
          loading ? <Loading/>
          : isTasksCompleted && !loading ? 
              <div className="flex flex-wrap gap-4">
                {
                  tasks.map((task) => {
                    if(task.completed) {
                      return (
                        <TaskCard task={task} key={task.id_task}/>
                      )
                    }
                  })
                }
              </div>
          : <h1>No hay tareas completadas</h1>
        }
    </section>
  )
}