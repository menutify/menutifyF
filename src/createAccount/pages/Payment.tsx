import { useNavigate } from 'react-router-dom'
import FormPayment from '../components/FormPayment'
import { routesPath } from '../../data/routes'
import { useDataGlobalContext } from '../../Context/GlobalContext'
import { caPayment } from '@/data/text'
import ProgressBar from '@/Components/my/ProgressBar'
import MyCard from '@/Components/my/MyCard'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import Parr1 from '@/Components/my/Parr1'
import Title1 from '@/Components/my/Title1'

function Payment() {
  const navigate = useNavigate()
  const { user, setApiPetition } = useDataGlobalContext()

  useEffect(() => {
    const socket = io(import.meta.env.VITE_APIPATH, {
      withCredentials: true, // Si estás usando cookies o credenciales
      transports: ['websocket', 'polling'],
      query: { user_id: user.id }, // Asegúrate de permitir ambos transportes
      timeout: 5000
    })

    socket.connect()

    socket.on('connect', () => {
      console.log('conectado')
    })

    // Error de conexión
    socket.on('connect_error', (err) => {
      console.error('Error de conexión:', err.message)
      // alert(
      //   'No se pudo conectar con el servidor. Por favor, revisa tu conexión o recarga la pagina.'
      // )
    })

    // Tiempo de espera superado
    socket.on('connect_timeout', () => {
      console.error(
        'Tiempo de espera superado para la conexión con el servidor.'
      )
      setApiPetition(false)
      // alert('El servidor no responde. Intenta nuevamente más tarde.')
    })

    socket.on('paymentCreated', (payment) => {
      console.log('Pago creado:', payment.paymentId)
    })

    socket.on('paymentStatus', (data) => {
      console.log('Respuesta del banco: ', data.status_detail, data.status)
      if (data.status_detail === 'accredited' && data.status === 'approved') {
        console.log('entramos')
        setApiPetition(false)
        navigate(routesPath.dashboard)
      }
    })

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('connect_timeout')
      socket.off('paymentIOCreated')
      socket.off('paymentStatus')
      socket.disconnect()
    }
  }, [user])

  // const logOut = async () => {
  //   setUser({
  //     id: null,
  //     isNew: null,
  //     email: null,
  //     subActive: null
  //   })
  //   await callAPI.getData(routesApi.logout)
  //   window.location.href = routesPath.login
  // }

  return (
    <MyCard className='overflow-x-hidden'>
      {/* <span className='absolute top-20 left-40 text-white '>
        5287 3383 1025 3304{' '}
      </span> */}
      <Title1>{caPayment.title1}</Title1>
      <div className='w-full'>
        <Parr1 className='text-parr_color_1 spacing'>{caPayment.parr1}</Parr1>
        <ProgressBar state={2} className={'mt-2 mb-3'} />
      </div>
      <FormPayment />
    </MyCard>
  )
}

export default Payment
