import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MetodoPago() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { metodo } = location.state || {}

  const continueToHome = async () => {
    try {
      // Realiza la solicitud al backend para actualizar "new" a false
      await axios.put(
        'http://localhost:3000/api/user',
        {},
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        }
      )

      // Redirige a home
      navigate('/home')
    } catch (error) {
      setError(true)
      console.log({ error })
    }
  }

  return (
    <div>
     <h2>Pago por: {metodo}</h2>
      {error && <p style={{ color: 'red' }}>Hubo un problema con el pago</p>}
      <button onClick={continueToHome}>Pagar</button>
    </div>
  )
}

export default MetodoPago
