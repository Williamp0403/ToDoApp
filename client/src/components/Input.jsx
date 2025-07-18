export function Input ({ placeholder, type, name, register, errors }) {
  return (
    <div className="w-full space-y-1">
      <input className={`${errors ? 'border-red-500' : 'border-green-500'} w-full p-3 rounded-md border outline-none`}
        placeholder={placeholder} 
        type={type}
        {...register(name)}
      />
      { errors && <p className="text-red-500 font-bold text-xs sm:text-sm mt-0">{ errors.message }</p> }
    </div>
  )
}