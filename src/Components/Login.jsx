import { useEffect, useState } from 'react'

import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import GoogleLoginComponent from './Login/GoogleLoginComponent'

import callAPI from '../helpers/callApi'
import FacebookLoginComponent from './Login/FacebookLoginComponent'

const Login = () => {
  const [email, setEmail] = useState('gianco.marquez@gmail.com')
  const [password, setPassword] = useState('elkake')
  const [error, setError] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    googleLogout()
    if (localStorage.getItem('token')) navigate('/me')
  }, [])

  //?--------------funcionLog-----------------
  const handleLogin = async (e) => {
    e.preventDefault()
    setError({ error: false, msg: '' })

    const resp = await callAPI.postData('login', { email, password })

    console.log({ resp })
    if (resp.error) {
      setError({ error: true, msg: resp.data?.msg })
      return
    }

    localStorage.setItem('token', resp.data.token)

    resp.data.new ? navigate('/payment') : navigate('/me')
  }

  return (
    <div className='login-container'>
      <h2>Iniciar Sesión</h2>
      {error.error && <p className='error'>{error.msg}</p>}
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Iniciar Sesión</button>
      </form>
      {/* inicio de google */}
      <div className='socialRedContainer'>
        <GoogleLoginComponent />
        <FacebookLoginComponent />
      </div>
      <Link to={'/repassword'}>¿Olvidaste tu contraseña?</Link>
      <p>
        No tienes una cuenta?{' '}
        <Link to={'/create-account'}>Registrate ahora!</Link>
      </p>
    </div>
  )
}

export default Login
