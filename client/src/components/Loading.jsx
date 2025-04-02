import { ClipLoader } from "react-spinners";

export function Loading({ className = "", size = 50 }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ClipLoader size={size} color={"#123abc"} loading={true} />
    </div>
  )
}