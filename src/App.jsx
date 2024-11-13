import { useEffect, useState } from 'react'
//estilos
import './App.scss'
//manejadores
import { Route, Navigate, Routes, useNavigate, Link } from 'react-router-dom'
//componentes
import Home from './layouts/Home'
import Login from './login/pages/Login'
// import MetodoPago from './layouts/MetodoPago'
// import Repassword from './layouts/Repassword'
// import SendEmail from './layouts/SendEmail'
// import ChangePassword from './layouts/ChangePassword'
// import CreateAccount from './layouts/CreateAccount'
// import ConfirmAccount from './layouts/ConfirmAccount'
// import ReadyAccount from './layouts/ReadyAccount'
import Payment from './createAccount/pages/Payment'
// import Completion from './payment/pages/Completion'
// import Test from './Test'

//metodos de pago
import { loadStripe } from '@stripe/stripe-js'

//utils
import { useDataGlobalContext } from './Context/GlobalContext'
import { getPublicKeyStripe } from './utils/getDataFromAPI'
import moveIfHasToken from './utils/moveIfHasToken'
import { googleLogout } from '@react-oauth/google'

//data
import { routesPath } from './data/routesPath'

function App() {
  const [loading, setLoading] = useState(true)
  const { setStripePromise,setUser } = useDataGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    const asyncInitialTask = async () => {
      //*inicializamos stripe
      const key = await getPublicKeyStripe()
      setStripePromise(loadStripe(key))

      //*verificamos que el token exista y sea valido
      await moveIfHasToken(navigate,setUser)
      setLoading(false)
    }

    asyncInitialTask()
    googleLogout()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route
        path={routesPath.initial}
        element={<Navigate to={routesPath.login} />}
      />
      <Route path={routesPath.login} element={<Login />} />
      <Route path={routesPath.home} element={<Home />} />
      {/* <Route path={routesPath.repassword} element={<Repassword />} /> */}
      {/* <Route path={routesPath.sendEmail} element={<SendEmail />} /> */}
      {/* <Route path={routesPath.changePassword} element={<ChangePassword />} /> */}
      {/* <Route path={routesPath.createAccount} element={<CreateAccount />} /> */}
      {/* <Route path={routesPath.caVerifyAccount} element={<ConfirmAccount />} /> */}
      {/* <Route path={routesPath.caReadyAccount} element={<ReadyAccount />} /> */}
      <Route path={routesPath.caPayment} element={<Payment />} />
      {/* <Route path={routesPath.caPayMp} element={<MetodoPago />} /> */}
      {/* <Route path={routesPath.caPaySt} element={<MetodoPago />} /> */}

      {/* <Route path='/ooooo' element={<Payment />} /> */}
      {/* <Route path='/--login' element={<Test />} /> */}
      {/* <Route path='/--completion' element={<Completion />} /> */}
    </Routes>
  )
}

export default App
