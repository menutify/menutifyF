// src/components/Home.jsx

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import callAPI from '../helpers/callApi'

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem('token')

    const verifyToken = async () => {
      if (token) {
        const data = await callAPI.getData('auth/me', { authorization: token })
        // console.log({ data })
        //maneja el token vencido
        if (data.error) {
          localStorage.removeItem('token')
          navigate('/login')
        }
        //envia el estado del usuario si es nuevo o no
        console.log({ data })
      }
      // Cambia el estado de loading aquí
    }

    verifyToken()
  }, [])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')

    navigate('/login')
  }

  return (
    <div className='home-container'>
      <h2>Bienvenido a Menutify</h2>
      {token ? (
        <p>Gestiona los menus de tu restaurant</p>
      ) : (
        <p>Por favor, inicia sesión.</p>
      )}
      <button onClick={logOut}>Cerrar sesion</button>
    </div>
  )
}

export default Home
