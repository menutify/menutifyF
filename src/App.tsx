import { useEffect, useState } from 'react'
//estilos

//manejadores
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
//utils
import { useDataGlobalContext } from './Context/GlobalContext'
import moveIfHasToken from './utils/moveIfHasToken'
import initPayMethod from './utils/initPayMethod'
import { googleLogout } from '@react-oauth/google'

//data
import { routesPath } from './data/routes'

//componentes
import Login from './login/pages/Login'
import Payment from './createAccount/pages/Payment'
import AuthLayout from './AuthLayout'
import CreateAccount from './createAccount/pages/CreateAccount'
import Repassword from './changePassword/pages/Repassword'
import SendEmail from './changePassword/pages/SendEmail'
import ChangePassword from './changePassword/pages/ChangePassword'
import ConfirmChangePassword from './changePassword/pages/confirmChangePassword'
import VerifyAccount from './createAccount/pages/VerifyAccount'
import ReadyAccount from './createAccount/pages/ReadyAccount'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const { setUser } = useDataGlobalContext()

  //rrd
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    googleLogout()

    const asyncInitialTask = async () => {
      //inicializa los metodos de pago
      await initPayMethod()
      //*verificamos que el token exista y sea valido
      await moveIfHasToken(navigate, setUser, location)
      setLoading(false)
    }

    asyncInitialTask()
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      //{' '}
      {/* <Route
        path={routesPath.initial}
        element={<Navigate to={routesPath.login} />}
      /> */}
      <Route path={routesPath.initial} element={<AuthLayout />}>
        <Route path={routesPath.login} element={<Login />} />
        {/* <Route path={routesPath.home} element={<Home />} /> */}
        <Route path={routesPath.repassword} element={<Repassword />} />
        <Route path={routesPath.sendEmail} element={<SendEmail />} />
        <Route path={routesPath.changePassword} element={<ChangePassword />} />
        <Route path={routesPath.createAccount} element={<CreateAccount />} />
        <Route
          path={routesPath.confirmChangePassword}
          element={<ConfirmChangePassword />}
        />
        <Route path={routesPath.caVerifyAccount} element={<VerifyAccount />} />
        <Route path={routesPath.caReadyAccount} element={<ReadyAccount />} />
        <Route path={routesPath.caPayment} element={<Payment />} />
        {/* <Route path={routesPath.caPayMp} element={<MetodoPago />} /> */}
        {/* <Route path={routesPath.caPaySt} element={<MetodoPago />} /> */}
        {/* <Route path='/ooooo' element={<Payment />} /> */}
        {/* <Route path='/--login' element={<Test />} /> */}
        {/* <Route path='/createAccount/completion' element={<Completion />} /> */}
      </Route>
    </Routes>
  )
}

export default App
