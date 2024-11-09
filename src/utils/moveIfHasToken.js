import routesPath from '../data/routesPath'
import callAPI from './callApi'

const moveIfHasToken = async (token, navigate) => {
  const data = await callAPI.getData('auth/me', { authorization: token })
  console.log({ data })

  // si hay errores mandame al login
  if (data.error) {
    localStorage.removeItem('token')
    navigate(routesPath.login, { replace: true }) 
    return
  }

  // si hay token y es nuevo mandame a payment
  if (data.new) {
    navigate(routesPath.caPayment, { replace: true })  
    return
  }

  //sino hay token y no es nuevo, mandame a home
  navigate(routesPath.home, { replace: true })
}

export default moveIfHasToken
