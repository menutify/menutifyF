import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'
import { routesApi, routesPath } from '../../data/routes'
import { useDataGlobalContext } from '../../Context/GlobalContext'

function ReadyAccount() {
  const navigate = useNavigate()
  const { token } = useParams()
  const { setUser } = useDataGlobalContext()
  const { error, handleSubmit, isPending } = HandleFormSubmit()

  useEffect(() => {
    handleSubmit(routesApi.caCreate, {}, { Authorization: token })
      .then((data) => {
        if (!data) {
          return
        }
        /**
         * data={
         email:"gianco.marquez@gmail.com"
         id: 1
         new: true
         */
        setUser(data)
      })
      .catch(() => {
        console.error('Error en el inicio de sesión:')

        return
      })
  }, [])
  const logOut = async () => {
    setUser({})
    await callAPI.getData(routesApi.logout)
    navigate(routesPath.login)
  }

  return (
    <div>
      ReadyAccount
      {error.error && <p className='error'>{error.msg}</p>}
      <button
        style={{ backgroundColor: error.error || isPending ? 'gray' : 'green' }}
        disabled={error.error || isPending}
        onClick={() => navigate(routesPath.caPayment)}
      >
        Continue -&gt;
      </button>
      <button onClick={logOut}>Cerrar sesion</button>
    </div>
  )
}

export default ReadyAccount
