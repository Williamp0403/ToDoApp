import { Router } from "express"
import { createTask, deleteTask, getTasks, updateTask, taskStatus } from "../controllers/task.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validateData.js"
import { taskSchema, taskStatusSchema } from "../schemas/task.schema.js"

const router = Router()

router.get('/get-tasks', authRequired, getTasks)

router.post('/create-task', authRequired, validateSchema(taskSchema), createTask)

router.put('/edit-task/:id', authRequired, validateSchema(taskSchema), updateTask)

router.put('/task-status/:id', authRequired, validateSchema(taskStatusSchema), taskStatus)

router.delete('/delete-task/:id', authRequired, deleteTask)


export default router