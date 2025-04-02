import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ModalLogout } from "./ModalLogout"
import { ModalProfile } from "./ModalProfile"

export function NavbarSecondary () {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isProfileModal, setProfileModal] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="relative">
      <svg className="cursor-pointer" onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M108-236.62v-85.99h744v85.99H108ZM108-438v-86h744v86H108Zm0-201.39v-85.99h744v85.99H108Z"/></svg>
      <div className={`${ isOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 h-screen w-72 bg-zinc-800 transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex justify-end p-5">
            <svg className="cursor-pointer" onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M252-189.85 191.85-252l227-228-227-230L252-772.15l229 230 227-230L768.15-710l-227 230 227 228L708-189.85l-227-230-229 230Z"/></svg>
        </div>

        <ul className="space-y-4">
          <NavLink onClick={() => setIsOpen(false)} to='/tasks' className={({ isActive }) => isActive ? "flex items-center gap-2 px-5 py-2 bg-green-900 text-white" : "flex items-center gap-2 px-5 py-2 hover:bg-green-900"}>
            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#FFFFFF"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            <li className="font-bold">Inicio</li>
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} to='/completed-tasks' className={({ isActive }) => isActive ? "flex items-center gap-2 px-5 py-2 bg-green-900 text-white" : "flex items-center gap-2 px-5 py-2 hover:bg-green-900"}>
            <svg  xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#FFFFFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
            <li className="font-bold">Completas</li>
          </NavLink>
          <div onClick={() => setProfileModal(true)} className="flex items-center gap-2 cursor-pointer hover:bg-green-900 px-5 py-2"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#FFFFFF"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            <li className="font-bold">Perfil</li>
          </div>
          <div onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-2 cursor-pointer hover:bg-green-900 px-5 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            <li className="font-bold">Cerrar sesión</li>
          </div>
        </ul>
      </div>
      { isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-zinc-800 opacity-50"></div> }
      <ModalLogout open={isLogoutModalOpen} setOpen={setIsLogoutModalOpen}/>
      <ModalProfile open={isProfileModal} setOpen={setProfileModal}/>
    </nav>
  )
} 