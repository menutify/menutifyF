import { useEffect, useState } from 'react'
//estilos

//manejadores
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  replace
} from 'react-router-dom'
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
import ConfirmChangePassword from './changePassword/pages/ConfirmChangePassword'
import VerifyAccount from './createAccount/pages/VerifyAccount'
import ReadyAccount from './createAccount/pages/ReadyAccount'
import CompletePayment from './createAccount/pages/CompletePayment'
import Home from './layouts/Home'
import LoadingBar from './components/my/LoadingBar'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const { setUser, setCharge } = useDataGlobalContext()

  //rrd
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    setCharge(true)
    googleLogout()

    const asyncInitialTask = async () => {
      //inicializa los metodos de pago
      await initPayMethod()
      //*verificamos que el token exista y sea valido
      await moveIfHasToken(navigate, setUser, location)
      setLoading(false)
    }

    asyncInitialTask()
    if (location.pathname === '/') {
      navigate('/login', { replace: true })
    }
    setCharge(false)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div>
        <LoadingBar />
        <h1>LOADING....</h1>
      </div>
    )
  }

  return (
    <>
      <LoadingBar />
      <Routes>
        <Route path={routesPath.initial} element={<AuthLayout />}>
          <Route path={routesPath.login} element={<Login />} />
          {/* <Route path={routesPath.home} element={<Home />} /> */}
          <Route path={routesPath.repassword} element={<Repassword />} />
          <Route path={routesPath.sendEmail} element={<SendEmail />} />
          <Route
            path={routesPath.changePassword}
            element={<ChangePassword />}
          />
          <Route path={routesPath.createAccount} element={<CreateAccount />} />
          <Route
            path={routesPath.confirmChangePassword}
            element={<ConfirmChangePassword />}
          />
          <Route
            path={routesPath.caVerifyAccount}
            element={<VerifyAccount />}
          />
          <Route path={routesPath.caReadyAccount} element={<ReadyAccount />} />
          <Route path={routesPath.caPayment} element={<Payment />} />
          <Route
            path={routesPath.completePayment}
            element={<CompletePayment />}
          />
        </Route>
        <Route path={routesPath.home} element={<Home />} />
      </Routes>
    </>
  )
}

export default App
