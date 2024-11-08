import {
  //   CardElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FormStripev2 = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [customerId, setCustomerId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Obtén el clientSecret del Setup Intent al cargar el componente
    // Ejemplo de cómo obtener el customerId
    fetch('http://localhost:3000/api/pay/create-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localStorage.getItem('email') }) // email del usuario
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Se obtuvo el customerId', { id: data.customerId })
        setCustomerId(data.customerId)
        // Guarda este customerId en tu base de datos o úsalo directamente para crear el Setup Intent
      })
      .catch((e) => console.log({ eInCustomId: e }))
  }, [])

  const handleSubmitSubscription = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion` // URL de éxito
      }
    })

    console.log('se acepto el pago de suscripcion', { paymentIntent, error })

    if (error) {
      setMessage(error.message)
      setIsLoading(false)
      return
    }

    // Aquí el pago fue confirmado, ahora llamamos al backend para crear la suscripción
    try {
      const response = await fetch(
        'http://localhost:3000/api/pay/create-subscription',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethodId: paymentIntent.payment_method, // PaymentMethod ID que fue confirmado
            customerId: customerId // customerId para asociar la suscripción
          })
        }
      )

      const data = await response.json()

      console.log('Se creo la suscripcion', { dataSub: data })
      if (data.error) {
        setMessage(data.error.message)
      } else {
        setMessage('Subscription created successfully!')
        navigate('/success')
      }
    } catch (error) {
      setMessage('Error creating subscription.', { errorEnTodod: error })
    }

    setIsLoading(false)
  }
  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        letterSpacing: '0.025em',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <form id='payment-form-subscribe' onSubmit={handleSubmitSubscription}>
      {/* <LinkAuthenticationElement
          id='link-authentication-element'
          onChange={(e) => setEmail(e.value.email)}
        /> */}
      <PaymentElement options={{ ...cardStyle, theme: 'night' }} />
      <button disabled={isLoading || !stripe || !elements}>Subscribe</button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}

export default FormStripev2
