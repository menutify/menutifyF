import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ChangePassword() {
  const [password, setPassword] = useState(null)
  const [password1, setPassword1] = useState(null)
  const [modal, setModal] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  
  const { token } = useParams()
  const callFunction = async (e) => {
    e.preventDefault()
    try {
      //http://localhost:3000/api/login/sendemail
      await axios.post(
        'http://localhost:3000/api/auth/reset-password',
        {
          password: password1
        },
        { headers: { authorization: token } }
      )

      setModal(true)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      if (error.status == 400) setError(true)
      console.log({ error })
    }
  }

  return (
    <div>
      <form onSubmit={callFunction}>
        <input
          type='password'
          placeholder='new password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='confirm password'
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <button type='submit'>ENVIAR</button>
      </form>
      {modal ? (
        <div>
          cambio exitoso
          <button onClick={() => navigate('/login')}>seguir</button>
        </div>
      ) : (
        <></>
      )}
      {error ? (
        <div>
          token vencido
          <button onClick={() => navigate('/login')}>seguir</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ChangePassword
