import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GoogleLoginComponent from '../layouts/GoogleLoginComponent'
import FacebookLoginComponent from '../layouts/FacebookLoginComponent'

import '../styles/Login.scss'
import FormLogin from '../layouts/FormLogin'
import { routesPath } from '../../data/routesPath'

const Login = () => {
  useEffect(() => {
    console.log('login')
    // googleLogout()
  }, [])

  return (
    <div className='login-container'>
      <h2>Iniciar Sesión</h2>

      <FormLogin />
      <div className='socialRedContainer'>
        <GoogleLoginComponent />
        <FacebookLoginComponent />
      </div>
      <Link to={routesPath.repassword}>¿Olvidaste tu contraseña?</Link>
      <p>
        No tienes una cuenta?{' '}
        <Link to={routesPath.createAccount}>Registrate ahora!</Link>
      </p>
    </div>
  )
}

export default Login
