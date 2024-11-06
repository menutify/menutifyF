import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Payment.css'
import FormPayment from '../Components/Forms/FormPayment'

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
      navigate('/' + paymentUrl, { state: { metodo: paymentUrl } })
    }
  }

  return (
    <div className='container'>
      <FormPayment />
    </div>
  )
}

export default Payment
