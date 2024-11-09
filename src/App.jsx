import { useEffect, useState } from 'react'
//estilos
import './App.scss'
//manejadores
import { Route, Navigate, Routes, useNavigate, replace } from 'react-router-dom'
//componentes
import Home from './layouts/Home'
import Login from './layouts/Login'
import MetodoPago from './layouts/MetodoPago'
import Repassword from './layouts/Repassword'
import SendEmail from './layouts/SendEmail'
import ChangePassword from './layouts/ChangePassword'
import CreateAccount from './layouts/CreateAccount'
import ConfirmAccount from './layouts/ConfirmAccount'
import ReadyAccount from './layouts/ReadyAccount'
import moveIfHasToken from './utils/moveIfHasToken'
import routesPath from './data/routesPath'
import Payment from './createAccount/pages/Payment'
import { loadStripe } from '@stripe/stripe-js'
import Completion from './payment/pages/Completion'
import Test from './Test'
import { getPublicKeyStripe } from './utils/getDataFromAPI'

function App() {
  // const [loading, setLoading] = useState(true)
  // const navigate = useNavigate()

  // const token = localStorage.getItem('token')
  // useEffect(() => {
  //   console.log('app')
  //   setLoading(true)
  //   if (token) {
  //     moveIfHasToken(token, navigate).finally(() => {
  //       setLoading(false)
  //     })
  //     return
  //   }

  //   console.log({ location: location.pathname })
  //   setLoading(false)
  // }, [])

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  const [stripePromise, setStripePromise] = useState(null)
  useEffect(() => {
    if (!stripePromise) {
      getPublicKeyStripe().then((pk) => {
        const resp = loadStripe(pk)
        setStripePromise(resp)
      })
    }
    // obtener clave publica para activar stripe
    fetch('http://localhost:3000/api/pay/config').then(async (r) => {
      const data = await r.json()
      const promise = await loadStripe(data.publishableKey)
      setStripePromise(promise)
    })
  }, [])

  return (
    <Routes>
      <Route
        path={routesPath.initial}
        element={<Navigate to={routesPath.login} />}
      />
      <Route path={routesPath.login} element={<Login />} />
      <Route path={routesPath.home} element={<Home />} />
      <Route path={routesPath.repassword} element={<Repassword />} />
      <Route path={routesPath.sendEmail} element={<SendEmail />} />
      <Route path={routesPath.changePassword} element={<ChangePassword />} />
      <Route path={routesPath.createAccount} element={<CreateAccount />} />
      <Route path={routesPath.caVerifyAccount} element={<ConfirmAccount />} />
      <Route path={routesPath.caReadyAccount} element={<ReadyAccount />} />
      <Route path={routesPath.caPayment} element={<Payment />} />
      <Route path={routesPath.caPayMp} element={<MetodoPago />} />
      <Route path={routesPath.caPaySt} element={<MetodoPago />} />
      <Route path={routesPath.payment} element={<Pagos />} />
      <Route path='/' element={<Payment stripePromise={stripePromise} />} />
      <Route path='/login' element={<Test />} />
      <Route
        path='/completion'
        element={<Completion stripePromise={stripePromise} />}
      />
    </Routes>
  )
}

export default App
