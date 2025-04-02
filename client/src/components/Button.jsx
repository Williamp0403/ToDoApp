export function Button ({ text }) {
  return (
    <button className='w-full py-4 bg-transparent text-green-400 border border-green-400 rounded-lg font-bold hover:bg-green-400 hover:text-zinc-900 transition ease-in-out duration-500 cursor-pointer' type="submit"> {text} </button>
  )
}