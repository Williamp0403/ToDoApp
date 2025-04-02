import { CATEGORIES } from "../const";
import Tooltip from '@mui/material/Tooltip';

export function Select({ name, register, reset, watch }) {

  const removeCategory = () => {
    const currentValues = watch()
    reset({ ...currentValues, category: "" });
  }

  return (
    <div className="w-full flex items-center gap-x-3">
      <select
        id="category-select"
        className="w-full text-gray-200 border border-green-600 rounded-lg py-3 px-3 "
        defaultValue=""
        name={name}
        {...register(name)} 
      >
        <option value="" disabled className="text-gray-400 bg-zinc-700">
          Selecciona una categoría
        </option>
        {CATEGORIES.map((category) => (
          <option
            key={category.id_category}
            value={category.id_category}
            className="bg-zinc-800 1text-gray-300 hover:bg-zinc-700 rounded-lg"
          >
            {category.name}
          </option>
        ))}
      </select>
      <Tooltip title={<span style={{ fontSize: '14px' }}>Eliminar Categoría</span>} placement="top" arrow>
        <button onClick={removeCategory} className="cursor-pointer text-sm h-8 py-[7px] px-[12px] rounded-full font-bold hover:bg-zinc-700" type="button">X</button>
      </Tooltip>
    </div>
  );
}
