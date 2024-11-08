import { useEffect, useState } from 'react'

function Completion({ stripePromise }) {
  const [messageBody, setMessageBody] = useState('')

  useEffect(() => {
    if (!stripePromise) return
    
    console.log({ strippePrromise: typeof stripePromise, stripePromise })

    const task = async () => {
      const url = new URL(window.location)
      const clientSecret = url.searchParams.get('payment_intent_client_secret')
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
    }

    task()
  }, [stripePromise])

  return (
    <>
      <h1>Thank you!</h1>
      <a href='/'>home</a>
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
