import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Input } from './Input'
import { updateProfileSchema } from '../schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'

export function ModalProfile({ open, setOpen }) {
  const { user, updateProfile } = useAuth()
  const { id, ...rest } = user
  const previousValues = useRef(rest)
  const [isUpdated, setIsUpdated] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(updateProfileSchema)
  });

  useEffect(() => {
    const { id, ...rest } = user
    previousValues.current = rest
    setValue('name', user.name);
    setValue('lastname', user.lastname)
    setValue('username', user.username)
  }, [setValue, user])

  const watchedValues = watch()

  useEffect(() => {
    const orderedWatchedValues = { username: watchedValues.username, name: watchedValues.name, lastname: watchedValues.lastname }
    if (JSON.stringify(orderedWatchedValues) === JSON.stringify(previousValues.current)) {
      setIsUpdated(false)
    } else {
      setIsUpdated(true)
    }
  }, [watchedValues])

  const onSubmit = handleSubmit((values) => {
    const newValues = { username: values.username, name: values.name, lastname: values.lastname }
    if (JSON.stringify(newValues) === JSON.stringify(previousValues.current)) {
      setIsUpdated(false)
      return
    }
    updateProfile(values, setOpen)
  })

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-zinc-900/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div className="bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div className="text-center sm:text-left">
                  <DialogTitle as="h3" className="text-xl font-bold text-white">
                    Perfil del usuario
                  </DialogTitle>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="#e3e3e3"> <path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480-450q-54.77 0-92.38-37.62Q350-525.23 350-580q0-54.77 37.62-92.38Q425.23-710 480-710q54.77 0 92.38 37.62Q610-634.77 610-580q0 54.77-37.62 92.38Q534.77-450 480-450Zm0 350q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Z" /></svg>
                      <h1 className="text-xl font-bold text-center">{user.name + ' ' + user.lastname}</h1>
                      <h2 className="text-zinc-300">{user.username}</h2>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-3">
                      <label className="font-bold" htmlFor=""> Nombre </label> <Input placeholder="Nombre" type={'text'} name="name" register={register} errors={errors.name}/>
                      <label className="font-bold" htmlFor=""> Apellido </label> <Input placeholder="Apellido" type={'text'} name="lastname" register={register} errors={errors.lastname}/>
                      <label className="font-bold" htmlFor=""> Nombre de usuario </label> <Input placeholder="Nombre de usuario" type={'text'} name="username" register={register} errors={errors.username} />
                      <div className="flex justify-end gap-x-3">
                        <button onClick={() => setOpen(false)} type="button" className="rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow-xs hover:bg-gray-300 cursor-pointer">
                          Cancelar
                        </button>
                        <button type="submit" disabled={!isUpdated} className={`rounded-md px-3 py-2 text-sm font-bold shadow-xs ${ isUpdated ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed' }`}>
                          Actualizar
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
  );
}
