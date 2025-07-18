import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas/auth.schema'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export function RegisterPage () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  })
  const { signup } = useAuth()

  const postRegister = handleSubmit( (values) => {
      signup(values)
    })
  
  return (
 <section className="flex justify-center items-center min-h-[calc(100vh-86px)] px-10">
    <div className="max-w-md w-full mx-aut p-5 rounded-xl border border-green-500 sm:space-y-5 space-y-3">
      <h1 className="sm:text-2xl text-xl font-bold text-green-400">Registrate</h1>
      <form className="flex flex-col gap-y-4" onSubmit={postRegister}>
        <Input placeholder="Nombre" type="text" name='name' register={register} errors={errors.name}/>
        <Input placeholder="Apellido" type='text' name='lastname' register={register} errors={errors.lastname} />
        <Input placeholder="Nombre de usuario" type='text' name="username" register={register}  errors={errors.username} />
        <Input placeholder="Contraseña" type="password" name="password" register={register}  errors={errors.password}/>
        <Button text="Enviar"/>
      </form>
      <p className='text-green-300 text-sm sm:text-base'>¿Ya tienes una cuenta? <Link className='text-sky-400 font-bold hover:underline' to="/login">iniciar sesión</Link> </p>
    </div>
    </section>
  )
}