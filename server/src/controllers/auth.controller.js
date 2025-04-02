import { queryGetUser, queryLogin, queryRegister, queryUpdateProfile } from "../models/mysql.js"
import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from "../config.js"

export const register = async (req,res) => {
  try {
    const response = await queryRegister(req.body)
    if(!response) return res.status(409).json({ message: 'El nombre de usuario ya está en uso. Por favor, elige otro.' })
    res.cookie('token', response.token, { maxAge: 7 * 24 * 60 * 60 * 1000 }).send(response.user)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
} 

export const login = async (req,res) => {
  try {
    const response = await queryLogin(req.body)
    if(!response) return res.status(401).json({ message: 'Usuario o contraseña incorrecta' })
    res.cookie('token', response.token, { maxAge: 7 * 24 * 60 * 60 * 1000 }).send(response.user)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

export const logout = (req,res) => {
  try {
    res.cookie('token', '', {
      expires: new Date(0)
    }).sendStatus(200)
  } catch (e) {
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}

export const verifyToken = (req,res) => {
  console.log(req.cookies)
  const { token } = req.cookies

  if(!token) return res.status(401).json({ message: 'No hay token, acceso denegado' })

  jwt.verify(token, SECRET_TOKEN , async (error, user) => {
    if(error) return res.status(401).json({ message: 'Token inválido' })
    
    const userFound = await queryGetUser(user.id)
    if(userFound.length == 0) return res.status(401).json({ message: 'Usuario no encontrado' })

    res.json({
      id: userFound[0].id_user,
      username: userFound[0].username,
      name: userFound[0].name,
      lastname: userFound[0].lastname
    })
  })
}

export const updateProfile = async (req,res) => {
  try {
    const response = await queryUpdateProfile(req.user.id, req.body)

    if(!response) return req.status(404).json({ messsage: 'Usuario no encontrado' })

    if(response.message == "El nombre de usuario ya está en uso. Por favor, elige otro.") return res.status(409).json({ message: response.message })

    if(response.message == "No se realizaron cambios en la información del usuario.") return res.status(200).json({ message: response.message })
    
    res.json({
      message: "EL usuario fue actualizado exitosamente.",
      user: response 
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
  }
}