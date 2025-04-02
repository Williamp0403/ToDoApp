import { createContext, useContext } from "react"
import { useTasks as useTasksProvider } from "../hooks/useTasks"; // Importa el hook personalizado

export const TasksContext = createContext()

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks debe utilizarse dentro de TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const tasks = useTasksProvider(); // Usa el hook personalizado

  return (
    <TasksContext.Provider value={tasks}>
      {children}
    </TasksContext.Provider>
  )
}


