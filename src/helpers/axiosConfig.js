// src/helpers/axiosConfig.js
import axios from 'axios'

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api' // Ajusta según tu API
})

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
  (response) => response, // Retorna la respuesta si es exitosa
  (error) => {
    // Manejo de errores global
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      console.error('Error en la respuesta:', error.response || error.message)
    }
    // Devuelve el error para que se pueda manejar en la llamada
    return Promise.reject(error)
  }
)

export default axiosInstance
