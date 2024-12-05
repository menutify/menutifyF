
import { useNavigate } from 'react-router-dom'
import callAPI from '../utils/callApi'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { routesApi, routesPath } from '@/data/routes'
import { Button } from '@/components/ui/button'
import Title2 from '@/components/my/Title2'

const Home = () => {
  const navigate = useNavigate()
  const { setUser } = useDataGlobalContext()

  const logOut = async () => {
    setUser({
      id: null,
      isNew: null,
      email: null,
      subActive: null
    })
    await callAPI.getData(routesApi.logout)
    navigate(routesPath.login)
  }

  return (
    <div className='home-container'>
      <Title2>Bienvenido a Menutify</Title2>

      <Button onClick={logOut}>Cerrar sesion</Button>
    </div>
  )
}

export default Home
