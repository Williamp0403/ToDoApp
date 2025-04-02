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
    <section className='pt-30 p-10 flex justify-center items-center'>
      <div className="max-w-sm w-full mx-auto bg-zinc-800 p-5 rounded-xl border border-green-500 space-y-5">
        <h1 className="text-2xl font-bold text-green-400">Registrar</h1>
        <form className="flex flex-col gap-y-4" onSubmit={postRegister}>
          <Input placeholder="Nombre" type="text" name='name' register={register} validation={{ required: true }} errors={errors.name}/>
          <Input placeholder="Apellido" type='text' name='lastname' register={register} validation={{ required: true }} errors={errors.lastname} />
          <Input placeholder="Nombre de usuario" type='text' name="username" register={register}  errors={errors.username} />
          <Input placeholder="Contraseña" type="password" name="password" register={register}  errors={errors.password}/>
          <Button text="Enviar"/>
        </form>
        <p className='text-green-300'>¿Ya tienes una cuenta? <Link className='text-sky-400 font-bold hover:underline' to="/login">iniciar sesión</Link> </p>
      </div>
    </section>
  )
}