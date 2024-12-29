import { useLogin } from 'react-facebook'

import { useNavigate } from 'react-router-dom'

import facebookLogo from '@/assets/login/facebook.svg'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { useState } from 'react'
import { routesApi, routesPath } from '@/data/routes'
import { User } from '@/types'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function FacebookLoginComponent() {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const { login } = useLogin()
  const { setUser } = useDataGlobalContext()

  const { handleSubmit, error } = HandleFormSubmit()

  async function handleSuccess() {
    setIsPending(true)
    try {
      const response = await login({
        scope: 'email'
      })

      if (response.status === 'connected') {
        // El login fue exitoso y se obtuvo un token
        const accessToken = response.authResponse.accessToken // Obtener el token de acceso
        console.log({ accessToken })
        // Realizar la solicitud a la API de Facebook
        const userProfileResponse = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
        )

        const userProfile = await userProfileResponse.json() // Parsear la respuesta en JSON

        // console.log('User Profile:', userProfile)

        handleSubmit(routesApi.facebook, userProfile).then((resp) => {
          console.log({ resp })

          if (!resp) {
            return
          }

          const { isNew } = resp as User

          setUser(resp as User)

          const { token } = resp as User

          if (token) {
            localStorage.setItem('token', token)
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          isNew
            ? navigate(routesPath.caPayment)
            : navigate(routesPath.dashboard)
        })
      }
    } catch (error) {
      console.log({ error })
      return
    } finally {
      facebookLogout()
      setIsPending(false)
    }
  }

  const facebookLogout = () => {
    window.FB.logout()
  }

  return (
    <>
      <button
        disabled={isPending ? true : false}
        className={`h-full min-w-[155px] w-[48%] flex gap-2 justify-center items-center bg-bg_input border-border_input_color 
         hover:border-border_input_color text-white text-sm/6 flex-1 `}
        onClick={handleSuccess}
      >
        <img className={'h-[80%]'} src={facebookLogo} alt='' />
        <span>Facebook</span>
      </button>
      <span
        className={`absolute -bottom-5 text-sm text-red-600 ${
          error ? 'hidden' : 'block'
        }`}
      >
        Error iniciar sesión con Facebook
      </span>
    </>
  )
}

export default FacebookLoginComponent
