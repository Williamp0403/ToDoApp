export function handlingErrors (e) {
  if (e.response?.status === 400 ) {
    return "Los datos ingresados son incorrectos."
  }

  if (e.response?.status === 401 ) {
    return  e.response.data.message || "Usuario o contraseña incorrecta"
  }

  if(e.response?.status === 409) { 
    return e.response.data.message || "El nombre de usuario ya existe."
  }

  if (e.response?.status === 404) {
    return e.response.data.message || "Recurso no encontrado."
  }

  if (e.response?.status === 500) {
    return e.response.data.message || "Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde."
  }

  if(e.message == "Network Error") {
    return "No se pudo conectar con el servidor. Verifica si el servicio está disponible."
  }

  return "Ocurrió un error desconocido. Por favor, revisa tu conexión."

}