import { queryCreateTask, queryDeleteTask, queryGetTasks, queryUpdateTask, queryTaskStatus } from "../models/mysql.js"

export const getTasks = async (req,res) => {
  try {
    const response = await queryGetTasks(req.user.id)
    res.send(response)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

export const createTask = async (req,res) => {
  try {
    await queryCreateTask(req)
    res.json({ message: 'Tarea creada correctamente.' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

export const updateTask = async (req,res) => {
  try {
    const response = await queryUpdateTask(req)

    if(!response) return res.status(404).json({ message: 'Tarea no encontrada.' })  

    if(response.message == "No se realizaron cambios en la tarea.") return res.status(200).json({ message: response.message })

    res.json({ message: 'Tarea actualizada correctamente.' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

export const taskStatus = async (req,res) => {
  try {
    const response = await queryTaskStatus(req)
    if(!response) return res.status(404).json({ message: 'Tarea no encontrada.' })
    res.json({ message: 'Tarea actualizada correcntamente.' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

export const deleteTask = async (req,res) => {
  try {
    const response = await queryDeleteTask(req.params.id)
    if(!response) return res.status(404).json({ message: 'Tarea no encontrada.' })
    res.json({ message: 'Tarea eliminada correctamente.' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

