import callAPI from './callApi'

const moveIfHasToken = async (token, navigate) => {
  
    const data = await callAPI.getData('auth/me', { authorization: token })
    console.log({ data })

    if (data.error) {
      localStorage.removeItem('token')
      navigate('/login', { replace: true }) // Redirige sin dejar historial
      return
    }
    if (data.new) {
      navigate('/create-account/payment', { replace: true }) // Redirige sin dejar historial
      return
    }
    navigate('/Home', { replace: true })
  
}

export default moveIfHasToken
