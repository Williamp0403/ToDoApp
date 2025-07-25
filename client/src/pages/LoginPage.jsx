import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas/auth.schema'
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const { signin } = useAuth()

  const postLogin = handleSubmit((values) => {
    signin(values)
  })

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-86px)] px-10">
      <div className="max-w-sm w-full mx-auto p-5 rounded-xl border border-green-500 sm:space-y-5 space-y-3">
        <h1 className="sm:text-2xl text-xl font-bold text-green-400">Iniciar sesión</h1>
        <form className="flex flex-col gap-y-4" onSubmit={postLogin}>
          <Input placeholder="Nombre de usuario" type='text' name="username" register={register} errors={errors.username} />
          <Input placeholder="Contraseña" type="password" name="password" register={register} errors={errors.password} />
          <Button text="Iniciar sesión" />
        </form>
        <p className="text-green-300 text-sm sm:text-base">¿No tienes una cuenta? <Link className="text-sky-400 font-bold hover:underline" to="/register">Registrate</Link></p>
      </div>
    </section>
  )
}
