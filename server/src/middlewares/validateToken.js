import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../config.js'

export function authRequired (req,res,next) {
  const { token } = req.cookies
  if(!token) return res.status(401).json({ message: 'No hay token, acceso denegado' })
  
  jwt.verify(token, SECRET_TOKEN, (error, user) => {
    if(error) return res.status(403).json({ message: 'Token inválido' })
    req.user = user
    next()
  })
}