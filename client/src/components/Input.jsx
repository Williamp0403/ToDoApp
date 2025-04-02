export function Input ({ placeholder, type, name, register, errors }) {
  return (
    <div className="w-full space-y-2">
      <input className={`${errors ? 'border-red-500' : 'border-green-500'} w-full px-3 py-3 rounded-md font-semibold border outline-none`}
        placeholder={placeholder} 
        type={type}
        {...register(name)}
      />
      { errors && <p className="text-red-500 font-bold text-sm mt-0">{ errors.message }</p> }
    </div>
  )
}