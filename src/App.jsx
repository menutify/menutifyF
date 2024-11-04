import { useEffect, useState } from 'react'
//estilos
import './App.css'
//manejadores
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom'
//componentes
import Home from './layouts/Home'
import Login from './layouts/Login'
import Payment from './layouts/Payment'
import MetodoPago from './layouts/MetodoPago'
import Repassword from './layouts/Repassword'
import SendEmail from './layouts/SendEmail'
import ChangePassword from './layouts/ChangePassword'
import callAPI from './helpers/callApi'
import CreateAccount from './layouts/CreateAccount'

function App() {
  const [loading, setLoading] = useState(true)
  const [resp, setResp] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const data = await callAPI.getData('auth/me', { authorization: token })
        // console.log({ data })
        //maneja el token vencido
        if (data.error) {
          localStorage.removeItem('token')
          navigate('/login')
        }
        //envia el estado del usuario si es nuevo o no
        setResp(data.new)
      }
      setLoading(false) // Cambia el estado de loading aquí
    }

    verifyToken()
  }, [])

  if (loading) {
    return <div>Loading...</div> // Puedes mostrar un loader mientras se cargan los datos
  }

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      {/* token existe? 
      1-> user.existe?
        1.1-> navegar pago
        1.2-> navegar home
      2-> navegar Login*/}
      <Route
        path='/me'
        element={
          resp ? (
            <Navigate to='/payment' replace />
          ) : (
            <Navigate to='/home' replace />
          )
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/home' element={<Home />} />
      <Route path='/MercadoPago' element={<MetodoPago />} />
      <Route path='/Stripe' element={<MetodoPago />} />
      <Route path='/repassword' element={<Repassword />} />
      <Route path='/send-email' element={<SendEmail />} />
      <Route path='/change-password/:token' element={<ChangePassword />} />
      <Route path='/create-account' element={<CreateAccount />} />
    </Routes>
  )
}

export default App
