import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import dayjs from "dayjs"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { taskSchema } from '../schemas/task.schema'
import { Input } from './Input'
import { Select } from './Select'

export function ModalUpdateTask ({ open, setOpen, task }) {
  const previousValues = useRef()
  const { updateTask } = useTasks()
  const [isUpdated, setIsUpdated] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(taskSchema)
  })

  const watchedValues = watch()

  // Cuando se abre el modal o se cambia la tarea, se establecen los valores en los input de la tarea seleccionada
  useEffect(() => {
    const { title, description, id_category, due_date } = task
    const formatedTask = {
      title, 
      description, 
      id_category: id_category === null ? '' : String(id_category),
      due_date
    }
    previousValues.current = { ...formatedTask }
    setValue("title", formatedTask.title)
    setValue("description", formatedTask.description)
    setValue("due_date", formatedTask.due_date)
    setValue("category", formatedTask.id_category)
  }, [setValue, task])

  // Cuando se haga un cambio en la tarea, se compara si los datos de la tarea son iguales a los que hay en los input
  useEffect(() => {
    const orderedWatchedValues = { title: watchedValues.title, description: watchedValues.description, id_category: watchedValues.category, due_date: watchedValues.due_date }
    if (JSON.stringify(orderedWatchedValues) === JSON.stringify(previousValues.current)) {
      setIsUpdated(false)
    } else {
      setIsUpdated(true)
    }
  }, [watchedValues])  

  const onSubmit = handleSubmit((values) => {
    const newValues = { title: values.title, description: values.description, category: values.category, due_date: values.due_date }
    if (JSON.stringify(newValues) === JSON.stringify(previousValues.current)) {
      setIsUpdated(false)
      return
    }
    updateTask(newValues, task.id_task, setOpen)
  })

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-15">
      <DialogBackdrop transition className="fixed inset-0 bg-zinc-900/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
            <div className="bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="text-center  sm:text-left">
                  <DialogTitle as="h3" className="text-xl font-bold text-white">
                   Editar Tarea
                  </DialogTitle>
                  <div className="mt-2">
                    <form className='flex flex-col gap-y-4' onSubmit={onSubmit}>
                      <Input placeholder='Título' type='text' name='title' register={register} errors={errors.title}/>
                      <div className='w-full space-y-2'>
                        <textarea placeholder='Descripción' className={`w-full h-25 max-h-70 font-semibold m-0 border rounded-md outline-none resize-none px-3 py-4 ${errors.description ? 'border-red-500' : 'border-green-500'}`} name="description" {...register('description')}></textarea>
                        { errors.description && <p className="text-red-500 font-bold text-sm mt-0">{errors.description.message}</p>}
                      </div>
                      <input className="w-full rounded-md py-3 px-3 border border-green-500" min={dayjs().format('YYYY-MM-DD')}  type='date' id='date'  name="due_date" {...register('due_date')}/>
                      { errors.due_date && <p className="text-red-500 font-bold text-sm mt-0">{errors.due_date.message}</p> }
                      <Select name='category' register={register} reset={reset} watch={watch}/>
                      { errors.category && <p className='text-red-500 font-bold text-sm mt-0'>{errors.category.message}</p> }
                      <div className='flex gap-x-3'>
                        <button type="submit" disabled={!isUpdated} className={`rounded-md px-3 py-2 text-sm font-bold shadow-xs ${ isUpdated ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed' }`}>
                          Editar
                        </button>
                        <button type="button" data-autofocus onClick={() => { setOpen(false)}} className=" rounded-md bg-white  px-3 py-2 text-sm font-bold text-gray-900 hover:bg-gray-300  cursor-pointer">
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

