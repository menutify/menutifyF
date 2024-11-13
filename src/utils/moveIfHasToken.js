import { routesPath, routesApi } from '../data/routesPath'
import callAPI from './callApi'

const moveIfHasToken = async (navigate, setUser) => {
  const { data, error, msg } = await callAPI.getData(routesApi.authMe)
  // si hay errores mandame al login
  if (error) {
    console.log(msg)
    navigate(routesPath.login, { replace: true })
    return
  }

  //en este punto ya tenemos la data
  setUser(data)
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
