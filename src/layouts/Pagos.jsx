import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51O1xShLwPyf2SXpsEcrkgTdRQF8lahbNPIHCtcMw5SpNGepLHxvVN3ZGW7yzK3RfplxzaZ6B1lZSE8fk2zke8Q0C00J3q74bqF')

function Pagos() {
    const stripe = useStripe()
    const elements = useElements()
  
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      if (!stripe || !elements) return
  
      const cardElement = elements.getElement(CardElement)
  
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })
  
      if (error) {
        console.log('[Error]', error)
      } else {
        const response = await fetch('http://localhost:3000/api/pay/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: 1000, // Monto en centavos (ej: 1000 = 10 USD)
            currency: 'usd'
          })
        })
  
        const result = await response.json()
        console.log(result)
      }
    }

  return (
    <Elements stripe={stripePromise}>
     <form onSubmit={handleSubmit}>
      <CardElement />
      <button type='submit' disabled={!stripe}>
        Pagar
      </button>
    </form>
    </Elements>
  )
}

export default Pagos
