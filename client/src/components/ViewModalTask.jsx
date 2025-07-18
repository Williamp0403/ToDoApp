import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar soporte para español
import { useTasks } from '../context/TasksContext';
import { CATEGORIES } from '../const';

dayjs.locale('es');

export function ViewModalTask ({ open, setOpen, task }) {
  const { formatDate } = useTasks()

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-zinc-900/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
            <div className="bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="text-left space-y-3">   
                  <DialogTitle as="h4" className="text-xl font-bold text-white">
                    <h3 className='text-sm font-medium text-gray-400'>Título.</h3>
                    <h1 className='break-words'>{task.title}</h1>
                  </DialogTitle>
                  <div className='space-y-3'>        
                    <div className='font-semibold tex-sm'>
                      <h3 className='text-sm font-medium text-gray-400'>Descripción.</h3>
                      <p className='text-sm text-gray-200 break-words'>{task.description}</p>
                    </div>
                    <div>
                      { task.name && (
                        <div>
                          <h3 className='text-sm font-medium text-gray-400'>Categoria.</h3>
                          <p className={`${CATEGORIES[task.id_category - 1].color} py-[3px] px-3 text-xs rounded-full font-bold inline-block`} >{task.name}</p>
                        </div> 
                      )} 
                    </div>
                    <div className='border-t text-xs border-zinc-500 pt-4 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2'>
                      <div className='flex items-center gap-x-1'>
                        <svg className='fill-zinc-400' xmlns="http://www.w3.org/2000/svg"  height="20px" viewBox="0 -960 960 960" width="20px" ><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                        <div>
                          <p className='text-gray-300'>Fecha de creación.</p>
                          <p className='font-semibold text-gray-200'>{ formatDate(task.creation_date)}</p>                      
                        </div>                    
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <svg className='fill-zinc-400' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                        <div>
                          <p className='text-gray-300'>Última actualización.</p>
                          <p className='font-semibold text-gray-200'>{ formatDate(task.updated_date) }</p>                      
                        </div>                    
                      </div>
                      {
                        task.due_date && (
                          <div className='flex items-center gap-x-1'>
                          <svg className='fill-zinc-400' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                            <div>
                              <p className='text-gray-300'>Fecha de vencimiento.</p>
                              <p className='font-semibold text-gray-200'>{ formatDate(task.due_date) }</p>                      
                            </div>                    
                          </div>
                        )
                      }
                    </div>
                    <p className={`${task.completed ? 'bg-green-600' : 'bg-zinc-700' } py-[4px] px-4 text-xs rounded-full font-bold inline-block`} >{task.completed ? 'Completada' : 'Pendiente'}</p>
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

