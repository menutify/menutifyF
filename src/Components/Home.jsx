// src/components/Home.jsx

import { useNavigate } from 'react-router-dom'

const Home = () => {
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
