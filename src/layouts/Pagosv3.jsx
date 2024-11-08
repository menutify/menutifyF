import { Elements } from '@stripe/react-stripe-js'

import FormStripev3 from '../Components/Forms/FormStripev3'
import { useEffect, useState } from 'react'

import axiosInstance from '../helpers/axiosConfig'

function Pagosv3({ stripePromise }) {
  const [clientIdSecretStripe, setClientIdSecretStripe] = useState('')
  useEffect(() => {
    const email = localStorage.getItem('email')
    if (email) {
      axiosInstance.post('/pay/create-customer').then((data) => {
        console.log('id de usuario obtenido', { data })
        setClientIdSecretStripe(data.data.customer)
      })
    }
  }, [])

  const options = {
    mode: 'payment', //payment | setup | subscription
    amount: 2000,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      theme: 'nigth',

      variables: {
        colorPrimary: '#ff0000', //color de border select
        colorBackground: '#00ff00', //bg input
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Arial, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '4px',
        
        // See all possible variables below
      }
    }
  }

  return (
    <Elements stripe={stripePromise} options={options}>
        
      <FormStripev3 clientId={clientIdSecretStripe} />
    </Elements>
  )
}

export default Pagosv3
