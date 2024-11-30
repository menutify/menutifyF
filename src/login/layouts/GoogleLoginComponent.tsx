import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useRef } from 'react'
import callAPI from '../../utils/callApi'
import { useNavigate } from 'react-router-dom'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi, routesPath } from '@/data/routes'

function GoogleLoginComponent() {
  const { user } = useDataGlobalContext()
  const navigate = useNavigate()

  const { handleSubmit } = HandleFormSubmit()

  const handleLoginGoogleSuccess = (credentialResponse) => {
    handleSubmit(routesApi.google, { credential: credentialResponse.credential })
      .then((resp) => {
        console.log({ resp }) // Puedes redirigir al usuario o guardar el token aquí

        localStorage.setItem('token', resp.token)
        localStorage.setItem('email', resp.email)

        resp.new ? navigate(routesPath.caPayment) : navigate('/home')
      })
      .catch((error) => console.error('Error al autenticar:', error))
      .finally(() => handleLogoutWithGoogle())
  }

  const handleLogoutWithGoogle = () => {
    googleLogout()
    if (window.google && window.google.accounts) {
      window.google.accounts.id.revoke(
        localStorage.getItem(user.email || localStorage.getItem('email') || ''),
        () => {
          console.log('Sesión de Google revocada.')
          localStorage.removeItem('email') // Limpia el correo guardado si tienes uno
        }
      )
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
      type='standard' //icon | standard
      size='large'
      shape='rectangular' //bordes: rectangular | circle
      width={100}
      theme='filled_black'
      containerProps={{
        style: {
          borderRadius: '8px', // Hace el contenedor circular
          overflow: 'hidden', // Asegura que el contenido se ajuste al contenedor
          marginRight: '-0px',
          width: '50%', // Ancho del botón
          height: '100%',
          backgroundColor: 'transparent'
        }
      }}
    />
  )
}

export default GoogleLoginComponent
