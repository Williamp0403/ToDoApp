import { Router } from "express"
import { login, register, logout, verifyToken, updateProfile } from "../controllers/auth.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { loginSchema, registerSchema, updateProfileSchema } from "../schemas/auth.schema.js"
import { authRequired } from "../middlewares/validateToken.js"

const router = Router()

router.post('/register', validateSchema(registerSchema), register)

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/verify-token', verifyToken)

router.put('/update-profile', authRequired, validateSchema(updateProfileSchema), updateProfile)

export default router