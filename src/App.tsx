import { useEffect } from 'react'
//estilos

//manejadores
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate
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
import LoadingBar from './Components/my/LoadingBar'
import Dashboard from './Dashboard/Dashboard'
import Restaurant from './Dashboard/restaurant/page/Restaurant'
import Component from './Component'
import CreateMenu from './Dashboard/createMenu/page/CreateMenu'
import Categories from './Dashboard/createMenu/components/Categories'

function App() {
  const { setUser, setLoading, loading } = useDataGlobalContext()

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
    if (location.pathname === '/') {
      navigate('/login', { replace: true })
    }
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
        <Route path={routesPath.dashboard} element={<Dashboard />}>
          <Route index element={<Navigate to={routesPath.restaurant} />} />
          <Route path={routesPath.restaurant} element={<Restaurant />} />
          <Route path={routesPath.seeMenu} element={<Component />} />
          <Route path={routesPath.createMenu} element={<CreateMenu />}>
            <Route
              index
              element={<Navigate to={`${routesPath.createMenu}/menu`} />}
            />
            <Route
              path={`${routesPath.createMenu}/menu`}
              element={<Categories />}
            />
          </Route>
          <Route path={routesPath.settingsMenu} element={<Component />} />
          <Route path={routesPath.account} element={<Component />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
