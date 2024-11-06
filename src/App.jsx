import { useEffect, useState } from 'react'
//estilos
import './App.css'
//manejadores
import { Route, Navigate, Routes, useNavigate, replace } from 'react-router-dom'
//componentes
import Home from './layouts/Home'
import Login from './layouts/Login'
import Payment from './layouts/Payment'
import MetodoPago from './layouts/MetodoPago'
import Repassword from './layouts/Repassword'
import SendEmail from './layouts/SendEmail'
import ChangePassword from './layouts/ChangePassword'
import CreateAccount from './layouts/CreateAccount'
import ConfirmAccount from './layouts/ConfirmAccount'
import ReadyAccount from './layouts/ReadyAccount'
import moveIfHasToken from './helpers/moveIfHasToken'
import routesPath from './data/routesPath'

function App() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  useEffect(() => {
    console.log('app')
    setLoading(true)
    if (token) {
      moveIfHasToken(token, navigate).finally(() => {
        setLoading(false)
      })
      return
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ2lhbmNvLm1hcnF1ZXpAZ21haWwuY29tIiwiaWF0IjoxNzMwODkzNDMzLCJleHAiOjE3MzA5MDc4MzN9.VIuC6jtitS6ouzG6CDxYvQJHBViaQqSqLe6WGiCuOA0

    // // Verificar si la ruta es la de restablecimiento de contraseña
    // if (location.pathname.startsWith('/create-account/ready-account')) {
    //   setLoading(false)
    //   return // Permitir acceso a esta página sin token
    // }
    console.log({ location: location.pathname })
    // navigate('/login', { replace: true })
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div> // Puedes mostrar un loader mientras se cargan los datos
  }

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
    </Routes>
  )
}

export default App
