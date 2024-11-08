import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import FormStripe from '../Components/Forms/FormStripe'


// StripePromise: clave publica de stripe
function Pagos({ stripePromise }) {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // se crea el metodo de pago y el producto a pagar, retorna el id de la compra
    fetch('http://localhost:3000/api/pay/create-payment-intent')
      .then((res) => res.json())
      .then((e) => {
        setClientSecret(e.clientSecret)
        console.log({e})
      })
  }, [])

  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <FormStripe />
        </Elements>
      )}
    </>
  )
}

export default Pagos
