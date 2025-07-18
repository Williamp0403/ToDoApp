import { db } from "../config/db.js"

export const queryGetTasks = async (id) => {
  const tasks = await db.execute({
    sql: `SELECT id_task, title, description, completed, t.id_category, c.name, DATE(due_date) AS due_date, DATETIME(creation_date, '-4 hours') creation_date, DATETIME(updated_date, '-4 hours') updated_date
        FROM Tasks t LEFT JOIN Categories c ON t.id_category = c.id_category
        WHERE id_user = ?
        ORDER BY due_date IS NULL, due_date ASC`,
    args: [id]
    })
    return tasks.rows
}

export const queryCreateTask = async (req) => {
  const { title, description, category, due_date } = req.body

  await db.execute ({
    sql: 'INSERT INTO Tasks (id_user, title, description, id_category, due_date) VALUES (?, ?, ?, ?, ?)',
    args: [req.user.id, title, description, category, due_date]
  })
}

export const queryTaskStatus = async (req) => {
  const { completed } = req.body
  const { id } = req.params
  const task = await db.execute({
    sql: 'UPDATE Tasks SET completed = ?, updated_date = CURRENT_TIMESTAMP WHERE id_task = ?',
    args: [completed, id]
  })
  if (task.rowsAffected === 0) return false
  return true
}

export const queryUpdateTask = async (req) => {
  const { title, description, category, due_date } = req.body
  const task = await db.execute ({
    sql: 'UPDATE Tasks SET title = ?, description = ?, id_category = ?, due_date = ?, updated_date = CURRENT_TIMESTAMP WHERE id_task = ?',
    args: [title, description, category, due_date, req.params.id]
  })

  if (task.rowsAffected === 0) return false
  return true
}

export const queryDeleteTask = async (id) => {
  const task = await db.execute({
    sql: 'DELETE FROM Tasks WHERE id_task = ?',
    args: [id]
  })
  if (task.rowsAffected === 0) return false
  return true
}