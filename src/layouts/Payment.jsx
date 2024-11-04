import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Payment.css'

function Payment() {
  const [selectedRegion, setSelectedRegion] = useState('')
  const [paymentUrl, setPaymentUrl] = useState('')

  const navigate = useNavigate()

  const handleSelectChange = (e) => {
    setSelectedRegion(e.target.value)
    switch (e.target.value) {
      case 'argentina':
        setPaymentUrl('MercadoPago')
        break
      case 'otros':
        setPaymentUrl('Stripe')
        break

      default:
        setPaymentUrl('')
    }
  }

  const handlePaymentClick = () => {
    if (paymentUrl) {
      navigate('/'+paymentUrl,{state:{metodo:paymentUrl}})
    }
  }

  return (
    <div className='container'>
      <h2 className='title'>Selecciona tu región de pago</h2>
      <select
        className='select'
        value={selectedRegion}
        onChange={handleSelectChange}
      >
        <option value=''>Selecciona tu región</option>
        <option value='argentina'>Argentina</option>
        <option value='otros'>Otros</option>
      </select>
      <button
        className='button'
        onClick={handlePaymentClick}
        disabled={!selectedRegion}
      >
        Realizar pago
      </button>
    </div>
  )
}

export default Payment
