import React, { useState } from 'react'

function Test() {
  const [message, setMessage] = useState('')
  const userAgent = useState(navigator.userAgent) // Obtener el User-Agent

  const login = async () => {
    try {
      //llamamos a login
      const response = await fetch('http://localhost:3000/api/pay/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userAgent })
      })

      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        // Muestra el mensaje de éxito
      } else {
        setMessage(data.message) // Muestra el mensaje de error
      }
    } catch (error) {
      console.error('Error en el login:', error)
      setMessage('Hubo un error al intentar hacer login.')
    }
  }

  const protectedRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pay/protected', {
        method: 'GET',
        credentials: 'include' // Para enviar cookies (el token)
      })

      const data = await response.json()
      if (response.ok) {
        setMessage(data.message) // Muestra el mensaje de éxito
      } else {
        setMessage(data.message) // Muestra el mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud protegida:', error)
      setMessage('Hubo un error al intentar acceder a la página protegida.')
    }
  }

  const logout = () => {
    // Eliminar la cookie del cliente
    document.cookie = 'authToken=; Max-Age=0; path=/' // Elimina la cookie de inmediato
    console.log({ msg: 'eliminado correctamente', coog: document.cookie })
  }

  return (
    <div className='App'>
      <h1>Autenticación con JWT y User-Agent</h1>

      <button onClick={login}>Login</button>
      <button onClick={protectedRequest}>Acceder a página protegida</button>
      <button onClick={logout}>logout</button>
      <p>{message}</p>
    </div>
  )
}

export default Test
