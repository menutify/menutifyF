import { routesPath, routesApi } from '../data/routes'
import callAPI from './callApi'

const moveIfHasToken = async (navigate, setUser, location) => {
  if (
    location.pathname == '/create-account' ||
    location.pathname.startsWith('/create-account/ready-account') ||
    location.pathname.startsWith('/change-password') ||
    location.pathname == '/createAccount/completion'
  ) {
    return
  }

  const { data, error, msg } = await callAPI.getData(
    routesApi.authMe + `?token=${localStorage.getItem('token')}`
  )
  // si hay errores mandame al login
  if (error) {
    console.log(msg)
    navigate(routesPath.login, { replace: true })
    return
  }

  //en este punto ya tenemos la data
  setUser(data)
  localStorage.setItem('token', data.token)
  // console.log({ data })
  // si hay token y es nuevo mandame a payment
  if (data.isNew && !data.subActive) {
    console.log(msg)
    navigate(routesPath.caPayment, { replace: true })
    return
  }

  if (data.isNew && data.subActive) {
    console.log(msg)
    navigate(routesPath.completePayment, { replace: true })
    return
  }
  //! verificar si tiene suscripcion activa, aunque eso puede ir en el home

  //sino hay token y no es nuevo, mandame a home
  if (location.pathname === '/login' && !data.isNew && data.subActive) {
    navigate(routesPath.dashboard, { replace: true })
  }
  if (!data.isNew && data.subActive) {
    const { pathname }: { pathname: string } = location
    if (pathname.startsWith('/dashboard') && !pathname.endsWith('menu')) {
      return
    }
    navigate(routesPath.dashboard, { replace: true })
  }
}

export default moveIfHasToken
