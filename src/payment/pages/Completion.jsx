import { useEffect, useState } from 'react'
import { useDataGlobalContext } from '../../Context/GlobalContext'

function Completion() {
  const [messageBody, setMessageBody] = useState('')
  const {stripePromise }= useDataGlobalContext()

  useEffect(() => {
    if (!stripePromise) return

    const task = async () => {
      const url = new URL(window.location)
      const clientSecret = url.searchParams.get('payment_intent_client_secret')     
      try {
        // Asegúrate de que `stripe.paymentIntents` esté definido
        if (stripePromise.retrievePaymentIntent) {
          // Usamos paymentIntents.retrieve para obtener el paymentIntent
          const { error, paymentIntent } =
            await stripePromise.retrievePaymentIntent(clientSecret)

          console.log({ error, paymentIntent })

          setMessageBody(
            error ? (
              `> ${error.message}`
            ) : (
              <>
                &gt; Payment {paymentIntent.status}:{' '}
                <a
                  href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {paymentIntent.id}
                </a>
              </>
            )
          )
        } else {
          console.error('paymentIntents no está disponible en stripe.')
        }
      } catch (err) {
        console.error('Error al recuperar el PaymentIntent:', err)
      }
    }

    task()
  }, [stripePromise])

  return (
    <>
      <h1>Thank you!</h1>
      <a href='/'>Dashboard</a>
      <div
        id='messages'
        role='alert'
        style={messageBody ? { display: 'block' } : {}}
      >
        {messageBody}
      </div>
    </>
  )
}

export default Completion
