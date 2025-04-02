import z from 'zod'

export const registerSchema = z.object({
  name:  z.string({ required_error: 'El nombre es requerido' }).trim().min(1, { message: 'El nombre es requerido' }).min(3, { message: 'La nombre debe tener al menos 3 caracteres' }).max(20, { message: 'El nombre no debe tener más de 20 caracteres' }),
  lastname: z.string({ required_error: 'El apellido es requerido' }).trim().min(1, { message: 'El apellido es requerido' }).min(3, { message: 'EL apellido debe tener al menos 3 caracteres' }).max(20, { message: 'EL apellido no debe tener mas de 20 caracteres' }),
  username: z.string({ required_error: 'El nombre de usuario es requerido' }).trim().min(1, { message: 'El nombre de usuario es requerido' }).min(3, { message: 'EL nombre de usuario debe tener al menos 3 caracteres' }).max(20, { message: 'EL nombre de usuario no debe tener mas de 20 caracteres' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).trim().min(1, { message: 'La contraseña es requerida'}).min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

export const loginSchema = z.object({
  username: z.string({ required_error: 'El nombre de usuario es requerido' }).trim().min(1, { message: 'El nombre de usuario es requerido' }).min(3, { message: 'EL nombre de usuario debe tener al menos 3 caracteres' }).max(20, { message: 'EL nombre de usuario no debe tener mas de 20 caracteres' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).trim().min(1, { message: 'La contraseña es requerida'}).min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

export const updateProfileSchema = z.object({
  name:  z.string({ required_error: 'El nombre es requerido' }).trim().min(1, { message: 'El nombre es requerido' }).min(3, { message: 'La nombre debe tener al menos 3 caracteres' }).max(20, { message: 'El nombre no debe tener más de 20 caracteres' }),
  lastname: z.string({ required_error: 'El apellido es requerido' }).trim().min(1, { message: 'El apellido es requerido' }).min(3, { message: 'EL apellido debe tener al menos 3 caracteres' }).max(20, { message: 'EL apellido no debe tener mas de 20 caracteres' }),
  username: z.string({ required_error: 'El nombre de usuario es requerido' }).trim().min(1, { message: 'El nombre de usuario es requerido' }).min(3, { message: 'EL nombre de usuario debe tener al menos 3 caracteres' }).max(20, { message: 'EL nombre de usuario no debe tener mas de 20 caracteres' }),
})