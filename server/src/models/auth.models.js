import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../config/db.js'

export const queryRegister = async (data) => {
  const { username, name, lastname, password } = data

  const userFind = await db.execute({
    sql:'SELECT * FROM Users WHERE username = :username', 
    args: { username }
  })
  if(userFind.rows.length > 0) return false

  const hashedPassword = await bcrypt.hash(password, 10)
  await db.execute({
    sql: `INSERT INTO Users (username, name, lastname, password) VALUES (:username, :name, :lastname, :hashedPassword)`,
    args: { username, name, lastname, hashedPassword }
  })

  const newUser = await db.execute({
    sql: 'SELECT * FROM Users WHERE username = :username', 
    args: { username }
  })

  const user = {
    id: newUser.rows[0].id_user,
    username: newUser.rows[0].username,
    name: newUser.rows[0].name,
    lastname: newUser.rows[0].lastname
  }
  
  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1d' })

  return { user, token }
}

export const queryLogin = async (data) => {
  const { username, password } = data
  
    const userFind = await db.execute({
      sql: 'SELECT * FROM Users WHERE username = :username', 
      args: { username }
    })

    if(userFind.rows.length == 0) return false
  
    const verifyPassword = await bcrypt.compare(password, userFind.rows[0].password)
    if(!verifyPassword) return false
  
    const user = {
      id: userFind.rows[0].id_user,
      username: userFind.rows[0].username,
      name: userFind.rows[0].name,
      lastname: userFind.rows[0].lastname
    }
  
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
  
    return { user, token }
}

export const queryGetUser = async (id) => {
  const getUser = await db.execute({
    sql: 'SELECT * FROM Users WHERE id_user = ?',
    args: [id]
  })
  console.log(getUser.rows[0])
  return getUser.rows[0]
}

export async function queryUpdateProfile (id, data) {
  const { username, name, lastname } = data

  const userFind = await db.execute({
    sql: 'SELECT * FROM Users WHERE username = ? AND id_user != ?',
    args: [username, id]
  })

  if(userFind.rows.length > 0) return { message: "El nombre de usuario ya está en uso. Por favor, elige otro." }
  
  const updatedUser = await db.execute({
    sql: 'UPDATE Users SET username = ?, name = ?, lastname = ? WHERE id_user = ? RETURNING *',
    args: [username, name, lastname, id]
  })

  if (updatedUser.rowsAffected === 0) return null

  return {
    id: updatedUser.rows[0].id_user,
    username: updatedUser.rows[0].username,
    name: updatedUser.rows[0].name,
    lastname: updatedUser.rows[0].lastname
  }
}