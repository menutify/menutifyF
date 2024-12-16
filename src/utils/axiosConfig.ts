// src/helpers/axiosConfig.js
import axios from 'axios'

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APIPATH + 'api' // Ajusta según tu API
  // baseURL: 'https://dirty-meals-write.loca.lt/api'
})

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
  (response) => response, // Retorna la respuesta si es exitosa
  (error) => {
    // Manejo de errores global
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      console.error(
        'Error en la respuesta axios:',
        error.response || error.message
      )
    }
    // Devuelve el error para que se pueda manejar en la llamada
    return Promise.reject(error)
  }
)

export default axiosInstance
