import z from 'zod'
import dayjs from "dayjs"
import { CATEGORIES } from '../const'

const today = dayjs().format('YYYY-MM-DD')
const VALID_CATEGORY_IDS = CATEGORIES.map(category => category.id_category)

export const taskSchema = z.object({
  title: z.string({ required_error: 'El titulo es requerido' }).trim().min(1, { message: 'El titulo es requerido' }).min(3, { message: 'El titulo debe ser mayor a 3 caracteres' }),
  description: z.string({ required_error: 'La descripción es requerida' }).trim().min(1, { message: 'La descripción es requerida' }).min(5, { message: 'La descripción debe ser mayor a 5 caracteres' }),
  due_date: z.string()
  .nullable() 
  .optional() 
  .refine(
    (date) => {
      if (!date) return true; 
      const selectedDate = new Date(date)
      const currentDate = new Date(today)
      return selectedDate >= currentDate
    },
    { message: 'Fecha inválida o menor a la actual' }
  ),
  category: z.union([z.string(), z.number()])
  .nullable()
  .optional()
  .refine(
    (id) => id === "" || id === null || VALID_CATEGORY_IDS.includes(Number(id)),
    { message: 'La categoría seleccionada no es válida' }
  )
});
