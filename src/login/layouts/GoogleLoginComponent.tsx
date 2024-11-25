import { GoogleLogin, googleLogout } from '@react-oauth/google'

import callAPI from '../../utils/callApi'
import { useNavigate } from 'react-router-dom'

function GoogleLoginComponent() {
  const navigate = useNavigate()

  const handleLoginGoogleSuccess = (credentialResponse) => {
    callAPI
      .postData('login/google', { credential: credentialResponse.credential })
      .then((resp) => {
        console.log({ resp }) // Puedes redirigir al usuario o guardar el token aquí

        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('email', resp.data.email)

        resp.data.new ? navigate('/payment') : navigate('/me')
      })
      .catch((error) => console.error('Error al autenticar:', error))
      .finally(() => handleLogoutWithGoogle())
  }

  const handleLogoutWithGoogle = () => {
    googleLogout()
    if (window.google && window.google.accounts) {
      window.google.accounts.id.revoke(localStorage.getItem('email'), () => {
        console.log('Sesión de Google revocada.')
        localStorage.removeItem('email') // Limpia el correo guardado si tienes uno
      })
    }
  }
  return (
    <GoogleLogin
      // className='google_button'
      onSuccess={handleLoginGoogleSuccess}
      onError={() => {
        console.log('Login Failed')
      }}
      ux_mode='popup'
      // itpSupport='true'
      type='icon'
      shape='circle'
      width={100}
      theme='outline'
      containerProps={{
        style: {
          borderRadius: '50%', // Hace el contenedor circular
          overflow: 'hidden', // Asegura que el contenido se ajuste al contenedor
          width: '40px', // Ancho del botón
          height: '40px',
          backgroundColor: 'transparent'
        }
      }}
    />
  )
}

export default GoogleLoginComponent
