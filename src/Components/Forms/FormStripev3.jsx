import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { useState } from 'react'
import axiosInstance from '../../helpers/axiosConfig'

const clientId = 'cus_RBCnrLZCO4Mc14'
function FormStripev3() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleError = (error) => {
    setLoading(false)
    setErrorMessage(error.message)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe) {
      return
    }

    setLoading(true)

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      handleError(submitError)
      return
    }
    console.log({ clientId })

    if (!clientId) {
      return
    }

    const resp = await axiosInstance.post('/pay/create-intent', {
      customerId: clientId
    })

    const clientSecret = await resp.data.client_secret

    // Confirm the PaymentIntent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/completion`
      }
    })

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(error)
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form className='formPay' onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id='link-authentication-element'
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement />
      <button type='submit' disabled={!stripe || loading}>
        Submit
      </button>
      {/* {errorMessage && <div>{errorMessage}</div>} */}
    </form>
  )
}

export default FormStripev3
