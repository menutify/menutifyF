import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { googleLogout } from '@react-oauth/google'
import GoogleLoginComponent from '../Components/LoginGF/GoogleLoginComponent'
import FacebookLoginComponent from '../Components/LoginGF/FacebookLoginComponent'

import '../style/Login.scss'
import FormLogin from '../Components/Forms/FormLogin'

const Login = () => {
  
  useEffect(() => {
    console.log('login')
    googleLogout()
  }, [])

  return (
    <div className='login-container'>
      <h2>Iniciar Sesión</h2>

      <FormLogin />
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
