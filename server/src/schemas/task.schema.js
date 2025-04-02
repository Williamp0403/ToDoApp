import z from 'zod'
import dayjs from 'dayjs'

const today = dayjs().format('YYYY-MM-DD');

export const taskSchema = z.object({
  title: z.string({ required_error: 'El titulo es requerido' }).trim().min(1, { message: 'El titulo es requerido' }).min(3, { message: 'El titulo debe ser mayor a 3 caracteres' }),
  description: z.string({ required_error: 'La descripcion es requerida' }).trim().min(1, { message: 'La descripcion es requerido' }).min(5, { message: 'La descripcion debe ser mayor a 5 caracteres' }),
  due_date: z.string()
  .nullable() 
  .optional()
  .refine(
    (date) => {
      if (!date) return true;
      const selectedDate = new Date(date);
      const currentDate = new Date(today);
      return selectedDate >= currentDate;
    },
    { message: 'Fecha inválida o menor a la actual' },
  )
});

export const taskStatusSchema = z.object({
  completed: z.boolean(),
})