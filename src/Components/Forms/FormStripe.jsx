import { useState } from 'react'
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import axiosInstance from '../../helpers/axiosConfig'
import { passwordLengthValidation } from '../../helpers/validForm'

function FormStripe({ data, clientId }) {
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  const handleError = (error) => {
    setLoading(false)
    setErrorMessage(error.message || error)
  }

  const validations = {
    name: (e) => {
      return e.name.length > 4 ? false : 'Nombre Incorrecto'
    },

    code: (e) => {
      if (e.code.length > 5) return 'Codigo de telefono erroneo'
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const { name, code, phone } = data

    // setLoading(true)

    for (const fun in validations) {
      if (validations[fun](data)) {
        handleError(validations[fun](data))
        return
      }
    }

    if (!name || !code || !phone) {
      handleError('Todos los campos son obligatorios')
      return
    }

    if (!stripe) {
      return
    }

    setLoading(true)

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      // handleError(submitError)
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

    // console.log('datos recibidos por stripe', { data })

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      // handleError(error)
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
        {loading ? 'cargando' : ' listo'}
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default FormStripe
