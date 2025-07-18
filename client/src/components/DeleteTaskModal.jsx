import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useTasks } from '../context/TasksContext'

export function DeleteTaskModal({ open, setOpen, task }) {
  const { deleteTask } = useTasks()

  const onClick = () => {
    deleteTask(task.id_task)
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-zinc-900/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div className="bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:size-10">
                  <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#EA3323"><path d="m78-130 402-692 402 692H78Zm94-54h616L480-714 172-184Zm309-49q13.5 0 23.25-9.75T514-266q0-13.5-9.75-23.25T481-299q-13.5 0-23.25 9.75T448-266q0 13.5 9.75 23.25T481-233Zm-27-103h54v-204h-54v204Zm26-113Z"/></svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-bold text-white">
                    Eliminar Tarea
                  </DialogTitle>
                  <div className="mt-2">
                  <p className='text-sm text-gray-300'>
                    ¿Estas seguro que deseas eliminar la tarea <strong>{task.title}</strong>?
                  </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClick}
                className="cursor-pointer inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Eliminar
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-300 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}