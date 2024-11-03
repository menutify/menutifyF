import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Repassword() {
  const [correo, setCorreo] = useState('')
  const navigate = useNavigate()

  const callFunction = async (e) => {
    e.preventDefault()
    try {
      //http://localhost:3000/api/login/sendemail
      await axios.post('http://localhost:3000/api/auth/sendemail', {
        email: correo
      })

      navigate('/send-email')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={callFunction}>
        <input
          type='email'
          placeholder='Email'
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <button type='submit'>ENVIAR</button>
      </form>
    </div>
  )
}

export default Repassword
