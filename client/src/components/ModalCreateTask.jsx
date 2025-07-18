import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import dayjs from "dayjs"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { taskSchema } from '../schemas/task.schema'
import { Input } from './Input'
import { useTasks } from '../context/TasksContext'
import { Select } from './Select'

export function ModalCreateTask ({ open, setOpen }) {
  const { createTask } = useTasks()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(taskSchema)
  })

  const onSubmit = handleSubmit((values) => {
    createTask(values, reset)
  })

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-zinc-900/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
            <div className="bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="text-center  sm:text-left">
                  <DialogTitle as="h3" className="text-xl font-bold text-white">
                   Crear Tarea
                  </DialogTitle>
                  <div className="mt-2">
                    <form className='flex flex-col gap-y-4' onSubmit={onSubmit}>
                      <Input placeholder='Título' type='text' name='title' register={register} errors={errors.title}/>
                      <div className='w-full space-y-2'>
                        <textarea placeholder='Descripción' className={`w-full h-25 max-h-70 m-0 border rounded-md outline-none resize-none px-3 py-4 ${errors.description ? 'border-red-500' : 'border-green-500'}`} name="description" {...register('description')}></textarea>
                        { errors.description && <p className="text-red-500 font-bold text-sm mt-0">{errors.description.message}</p>}
                      </div>
                      <input className="w-full rounded-md py-3 px-3 border border-green-500" min={dayjs().format("YYYY-MM-DD")}  type='date' id='date'  name="due_date" {...register('due_date')}/>
                      { errors.due_date && <p className="text-red-500 font-bold text-sm mt-0">{errors.due_date.message}</p> }
                      <Select name='category' register={register} reset={reset}/>
                      {/* <button type="button" className='cursor-pointer' onClick={() => reset()}><svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#EA3323"><path d="M308-140q-37 0-61.5-24.5T222-226v-498h-40v-54h176v-36h246v36h176v54h-40v498q0 36.73-24.64 61.36Q690.72-140 654-140H308Zm378-584H276v498q0 14 9 23t23 9h346q12 0 22-10t10-22v-498ZM381-275h54v-368h-54v368Zm146 0h54v-368h-54v368ZM276-724v530-530Z"/></svg></button> */}
                      { errors.category && <p className='text-red-500 font-bold text-sm mt-0'>{errors.category.message}</p> }
                      <div className='flex justify-between'>
                        <div className='flex gap-x-4'>
                          <button type="submit" className="rounded-md bg-green-500 px-3 py-2 text-sm font-bold text-white shadow-xs hover:bg-green-600 cursor-pointer">
                            Agregar
                          </button>
                          <button type="button" data-autofocus onClick={() => { 
                            setOpen(false)
                            reset()
                          }} className=" rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-300  cursor-pointer">
                            Cancelar
                          </button>
                        </div>
                        <button type="button" data-autofocus onClick={() => { 
                          reset()
                        }} className=" rounded-md bg-gray-500 px-3 py-2 text-sm font-bold text-white shadow-xs hover:bg-gray-400  cursor-pointer">
                          Limpiar
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

