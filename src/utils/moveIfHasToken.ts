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

  const { data, error, msg } = await callAPI.getData(routesApi.authMe)
  // si hay errores mandame al login
  if (error) {
    console.log(msg)
    navigate(routesPath.login, { replace: true })
    return
  }

  //en este punto ya tenemos la data
  setUser(data)
  console.log(data)
  // si hay token y es nuevo mandame a payment
  if (data.isNew) {
    console.log(msg)
    navigate(routesPath.caPayment, { replace: true })
    return
  }

  //! verificar si tiene suscripcion activa, aunque eso puede ir en el home
  console.log(msg)
  //sino hay token y no es nuevo, mandame a home
  navigate(routesPath.home, { replace: true })
}

export default moveIfHasToken
