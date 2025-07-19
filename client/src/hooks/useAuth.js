import { useState, useEffect } from "react"
import Cookie from 'js-cookie'
import { loginRequest, logoutRequest, registerRequest, updateProfileRequest, verifyRequest } from "../api/auth"
import Swal from 'sweetalert2'
import { useNotification } from "../components/Notification.jsx"
import { handlingErrors } from "../libs/errors.js"
import { useTasks } from "../context/TasksContext.jsx"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const { setTasks } = useTasks()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const notify = useNotification()

  useEffect(() => {
    const checkToken = async () => {
       try {
        const response = await verifyRequest()
        setIsAuthenticated(true)
        setUser(response.data)
      } catch (e) {
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    };

    checkToken();
  }, []);

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      Swal.fire({
        html: "Registrado correctamente!!",
        icon: "success",
        theme: "dark",
        background: 'rgb(37 37 37)'
      }).then(() => {
        setUser(res.data);
        setIsAuthenticated(true)
      })
    } catch (e) {
      Swal.fire({
        html: e.response.data.message,
        theme: "dark",
        icon: "error",
        background: 'rgb(37 37 37)'
      });
    }
  }

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      Swal.fire({
        html: `Bienvenido ${res.data.name}!!`,
        icon: "success",
        theme: "dark",
        background: 'rgb(37 37 37)'
      }).then(() => {
        setIsAuthenticated(true);
        setUser(res.data);
      })
    } catch (e) {
      console.log('eeee', e)
      Swal.fire({
        html: handlingErrors(e),
        theme: "dark",
        icon: "error",
        background: 'rgb(37 37 37)'
      });
    }
  }

  const logout = async () => {
    try {
      const res = await logoutRequest()
      console.log('logut', res)
      setIsAuthenticated(false)
      setUser(null)
      setTasks([])
    } catch (e) {
      console.log(e)
      notify.error({
        message: 'Error.',
        description: handlingErrors(e)
      })
    }
  }

  const updateProfile = async (data, setOpen) => {
    try {
      const res = await updateProfileRequest(data);
      console.log('resUpdated', res);

      if (res.data.message === "No se realizaron cambios en la información del usuario.") {
        notify.info({
          message: "Sin cambios",
          description: "No hubo modificaciones, ya que los datos proporcionados son idénticos a los actuales.",
        })
        return
      }
  
      setUser(res.data.user)
      setOpen(false)

      notify.success({
        message: "Usuario actualizado.",
        description: `${res.data.message}`,
      })
  
    } catch (e) {
      console.log(e)
      notify.error({
        message: 'Error.',
        description: handlingErrors(e)
      })
    }
  }
  

  return {
    user,
    isAuthenticated,
    loading,
    signup,
    signin,
    setUser,
    logout,
    updateProfile
  };
};
