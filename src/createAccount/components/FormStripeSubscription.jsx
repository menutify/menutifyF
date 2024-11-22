import { useEffect, useState } from 'react'
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

import validateInputData from '../../utils/validateFormInputData'
import callAPI from '../../utils/callApi'
import { routesApi } from '../../data/routesPath'

function FormStripeSubscription({ id, data, email, setErrorMessage }) {
  const [loading, setLoading] = useState(false)
  // const [email, setEmail] = useState('')

  //stripe hooks
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    console.log(`${window.location.origin}/createAccount/completion`)
  }, [])

  const handleError = (error) => {
    setLoading(false)
    setErrorMessage(error)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)

    //validamos datos
    const validationMsg = validateInputData(data)

    if (!stripe) {
      handleError('Error al cargar stripe hook')
      return
    }

    if (validationMsg) {
      handleError(validationMsg)
      return
    }

    // Activar la validación de formularios y la respuesta del monedero
    const { error: submitError } = await elements.submit()

    if (submitError) {
      handleError('Error al enviar elements hook')
      return
    }
    console.log({ data })

    //emoji no lo necesitamos enviar
    const { emoji, ...sendData } = data
    //nombre no peude tener espacios al inicio ni al final
    sendData.name = sendData.name.trim()

    //crear la suscripcion
    const {
      error: paymentError,
      msg,
      data: paymentData
    } = await callAPI.postData(routesApi.caStripePayment, {
      email,
      ...sendData,
      id
    })

    console.log({ paymentData })
    if (paymentError) {
      handleError(msg)
      return
    }

    console.log({ resp: paymentData })
    const clientSecret = await paymentData.clientSecret

    console.log({ clientSecret })

    // Confirm the PaymentIntent using the details collected by the Payment Element
    const { error: errorConfirmPayment } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/createAccount/completion`
      }
    })

    console.log({ errorConfirmPayment })
    // console.log('datos recibidos por stripe', { data })

    if (errorConfirmPayment) {
      handleError('Error al terminar el pago')
      setLoading(false)
      return
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      // handleError(error)
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      setLoading(false)
    }
  }

  return (
    <form className='formPay' onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id='link-authentication-element'
        onChange={(e) => setEmail(e.value.email)}
      /> */}
      <PaymentElement />
      <button type='submit' disabled={!stripe || loading}>
        {loading ? 'cargando' : ' listo'}
      </button>
    </form>
  )
}

export default FormStripeSubscription
