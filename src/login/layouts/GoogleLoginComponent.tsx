import {
  CredentialResponse,
  GoogleLogin,
  googleLogout
} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi, routesPath } from '@/data/routes'
import googleLogo from '@/assets/login/google.svg'
import { User } from '@/types'
import { useState } from 'react'

function GoogleLoginComponent() {
  const { setUser } = useDataGlobalContext()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const { handleSubmit, error } = HandleFormSubmit()

  const handleLoginGoogleSuccess = (credentialResponse: CredentialResponse) => {
    setIsPending(true)
    console.log(isPending)
    handleSubmit(routesApi.google, {
      credential: credentialResponse.credential
    })
      .then((resp) => {
        console.log({ resp }) // Puedes redirigir al usuario o guardar el token aquí

        if (!resp) {
          return
        }

        const { isNew } = resp as User

        // localStorage.setItem('email', email || '')
        setUser(resp as User)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isNew ? navigate(routesPath.caPayment) : navigate(routesPath.home)
      })
      .catch((error) => console.error('Error al autenticar:', error))
      .finally(() => {
        handleLogoutWithGoogle()
        setIsPending(false)
      })
  }

  const handleLogoutWithGoogle = () => {
    googleLogout()
  }

  return (
    <>
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
      <button
        disabled={isPending ? true : false}
        className={`text-base min-w-[155px] w-[50%] h-full flex flex-1 gap-2 justify-center items-center ${
          isPending ? 'bg-[#444]' : 'bg-bg_input'
        } border-border_input_color text-parr_color_3 absolute top-0 left-0 `}
      >
        <img className={'h-[80%]'} src={googleLogo} alt='' />
        <span>Google</span>
      </button>
      <span
        className={`absolute -bottom-5 text-sm text-red-600 ${
          error ? 'hidden' : 'block'
        }`}
      >
        Error iniciar sesión con Google
      </span>
    </>
  )
}

export default GoogleLoginComponent
