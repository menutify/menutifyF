import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import FormStripev2 from '../Components/Forms/FormStripev2'
import FormStripe from '../Components/Forms/FormStripe'

function Pagosv2({ stripePromise }) {
  const [clientSecret, setClientSecret] = useState('')
  const [isSubscription, setIsSubscription] = useState(true)

  useEffect(() => {
    // const endpoint = isSubscription
    //   ? 'http://localhost:3000/api/pay/create-subscription'
    //   : 'http://localhost:3000/api/pay/create-payment-intent'

    if (isSubscription) {
      fetch('http://localhost:3000/api/pay/create-payment-intent')
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
          console.log({ dataOnePay: data })
        })
    }
  }, [isSubscription])

  const appearance = {
    theme: 'night',
    // labels: 'floating',
    variables: {
      borderRadius: '8px', // Bordes redondeados
      spacingUnit: '2px', // Espaciado entre los campos
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif', // Fuente
      borderColor: '#ccc', // Color de borde normal
      focusBorderColor: '#FFEB3B', // Color de borde cuando el input está en foco (amarillo)
      inputBackground: '#222', // Fondo del input (puedes cambiar el color si lo deseas)
      textColor: '#fff' // Color del texto}
    }
  }

  return (
    <>
      <h1>Payment</h1>
      <label>
        <input
          type='checkbox'
          checked={!isSubscription}
          onChange={() => setIsSubscription(!isSubscription)}
        />
        Pago Automático (Suscripción)
      </label>

      {isSubscription
        ? clientSecret &&
          stripePromise && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <FormStripe isSubscription={isSubscription} />
            </Elements>
          )
        : stripePromise && (
            <Elements stripe={stripePromise} options={appearance}>
              <FormStripev2 isSubscription={isSubscription} />
            </Elements>
          )}
    </>
  )
}

export default Pagosv2
