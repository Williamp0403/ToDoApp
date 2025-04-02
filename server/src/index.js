import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import taksRouter from './routes/task.routes.js'
import { FRONTEND_URL, PORT } from './config.js'

const app = express()

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(authRouter)
app.use(taksRouter)

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto http://localhost:${PORT}`)
})
