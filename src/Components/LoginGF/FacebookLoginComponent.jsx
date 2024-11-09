import FacebookLogin from 'react-facebook-login'
import callAPI from '../../utils/callApi'
import { useNavigate } from 'react-router-dom'
function FacebookLoginComponent() {
  
  const navigate = useNavigate()

  const handleFacebookCallback = async (response) => {
    try {
      const { email, id, name } = await response
      callAPI
        .postData('login/facebook', { email, id, name })
        .then((resp) => {
          console.log({ resp }) // Puedes redirigir al usuario o guardar el token aquí

          localStorage.setItem('token', resp.data.token)
          // localStorage.setItem('email', resp.data.email)

          resp.data.new ? navigate('/payment') : navigate('/me')
        })
        .catch((error) => console.error('Error al autenticar:', error))
    } catch (error) {
      console.error('Sorry!', 'Something went wrong with facebook Login.', {
        error
      })
      return
    }

    facebookLogout()
  }

  const facebookLogout = () => {
    window.FB.logout()
  }

  return (
    <FacebookLogin
      appId='905115708233329'
      autoLoad={false}
      fields='name,email,picture'
      // onClick={componentClicked}
      callback={handleFacebookCallback}
      textButton=''
      buttonStyle={{
        width: '40px' /* El ancho será del 100% del contenedor padre */,
        aspectRatio: '1 / 1',

        backgroundColor: '#4267B2', // Color de fondo de Facebook
        color: 'white', // Color del texto
        border: 'none', // Sin borde
        borderRadius: '50%', // Esquinas redondeadas
        padding: '0',
        paddingLeft: 6,
        paddingTop: 5,

        cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
        fontSize: '20px' // Tamaño de fuente
      }}
      icon='fa-facebook'
    />
  )
}

export default FacebookLoginComponent
