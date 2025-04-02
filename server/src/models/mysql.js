import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../config.js'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'administrador_de_tareas' 
}

const connection = await mysql.createPool(config)

export async function queryRegister (data) {
  const { username, name, lastname, password } = data

  const [userFind] = await connection.query('SELECT * FROM Users WHERE username = ?', [username])
  if(userFind.length > 0) return false

  const hashedPassword = await bcrypt.hash(password, 10)
  await connection.query (
    'INSERT INTO Users (username, name, lastname, password) VALUES (?, ?, ?, ?)', [username, name, lastname, hashedPassword]
  )  
  const [newUser] = await connection.query('SELECT * FROM Users WHERE username = ?', [username])

  const user = {
    id: newUser[0].id_user,
    username: newUser[0].username,
    name: newUser[0].name,
    lastname: newUser[0].lastname
  }
  
  const token = jwt.sign({ id: user.id }, SECRET_TOKEN, { expiresIn: '1d' })

  return { user, token }
}

export async function queryLogin (data) {
  const { username, password } = data

  const [userFind] = await connection.query('SELECT * FROM Users WHERE username = ?', [username])
  if(userFind.length == 0) return false

  const verifyPassword = await bcrypt.compare(password, userFind[0].password)
  if(!verifyPassword) return false

  const user = {
    id: userFind[0].id_user,
    username: userFind[0].username,
    name: userFind[0].name,
    lastname: userFind[0].lastname
  }

  const token = jwt.sign({ id: user.id }, SECRET_TOKEN, { expiresIn: '1d' })

  return { user, token }
}

export async function queryGetUser (id) {
  const [user] = await connection.query('SELECT * FROM Users WHERE id_user = ?', [id])
  return user
}

export async function queryUpdateProfile (id,data) {
  const { username, name, lastname } = data

  const [userFind] = await connection.query('SELECT * FROM Users WHERE username = ? AND id_user != ?', [username, id])
  console.log(userFind)
  if(userFind.length > 0) return { message: "El nombre de usuario ya está en uso. Por favor, elige otro." }
  
  const [user] = await connection.query (
    'UPDATE Users SET username = ?, name = ?, lastname = ? WHERE id_user = ? ', 
    [username, name, lastname, id]
  )

  if(user.affectedRows == 0) return null

  if(user.changedRows == 0) return { message: "No se realizaron cambios en la información del usuario." }

  const [updatedUser] = await connection.query('SELECT * FROM Users WHERE id_user = ?', [id])
  return {
    id: updatedUser[0].id_user,
    username: updatedUser[0].username,
    name: updatedUser[0].name,
    lastname: updatedUser[0].lastname
  }
}

export async function queryGetTasks (id) {
  const [tasks] = await connection.query (
    `SELECT id_task, title, description, completed, t.id_category, c.name, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, creation_date, updated_date
    FROM Tasks t LEFT JOIN Categories c ON t.id_category = c.id_category
    WHERE id_user = ?
    ORDER BY due_date IS NULL, due_date ASC`, [id])
  return tasks
}

export async function queryCreateTask (req) {
  const { title, description, category, due_date } = req.body

  await connection.query (
    `INSERT INTO Tasks (id_user, title, description, id_category, due_date) VALUES (?, ?, ?, ?, ?)`, [ req.user.id, title, description, category, due_date ]
  )
}

export async function queryUpdateTask (req) {
  const { title, description, category, due_date } = req.body
  const [task] = await connection.query (
    'UPDATE Tasks SET title = ?, description = ?, id_category = ?, due_date = ? WHERE id_task = ?',
    [title, description, category, due_date, req.params.id]
  )

  if (task.affectedRows == 0) return false
  if(task.changedRows == 0) return { message: 'No se realizaron cambios en la tarea.' }
  
  return true
}

export async function queryTaskStatus(req) {
  const { completed } = req.body
  const { id } = req.params
  const [task] = await connection.query('UPDATE Tasks SET completed = ? WHERE id_task = ?', [completed, id])
  if(task.affectedRows == 0) return false
  return true
}

export async function queryDeleteTask (id) {
  const [task] = await connection.query ('DELETE FROM Tasks WHERE id_task = ?', [id])
  if (task.affectedRows == 0) return false
  return true
}

