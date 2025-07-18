import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useAuth } from '../context/AuthContext'

export function ModalLogout({ open, setOpen }) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">

      <DialogBackdrop 
        transition
        className="fixed inset-0 bg-zinc-900/90 transition-opacity duration-300 ease-in-out"
      />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel 
          transition
          className="w-full max-w-md transform rounded-lg bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24" 
                viewBox="0 -960 960 960" 
                width="24" 
                fill="#EA3323"
              >
                <path d="m78-130 402-692 402 692H78Zm94-54h616L480-714 172-184Zm309-49q13.5 0 23.25-9.75T514-266q0-13.5-9.75-23.25T481-299q-13.5 0-23.25 9.75T448-266q0 13.5 9.75 23.25T481-233Zm-27-103h54v-204h-54v204Zm26-113Z"/>
              </svg>
            </div>

            <div className="text-center sm:text-left">
              <DialogTitle as="h3" className="text-lg font-bold leading-6 text-white">
                Cerrar sesión
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-300">
                  ¿Estás seguro que deseas cerrar sesión?
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}