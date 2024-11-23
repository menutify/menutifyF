import { initMercadoPago } from '@mercadopago/sdk-react'
import { getDataProduct, getPublicKeyStripe } from './getDataFromAPI'
import { loadStripe } from '@stripe/stripe-js'

const allpkmp = {
  pk_test1: 'TEST-a01de139-ec21-47ed-8900-1971056920a1', //onePay
  pk_test2: 'APP_USR-f9e0aab2-5def-4b4e-9feb-62d7cbbc8ca1', // vendedor 
  pk_test3: 'TEST-bc5aba84-1864-40ea-b90e-39e4d7bacb3a' //suscription
}

async function initPayMethod(setStripePromise, setProduct) {
  //obtener datos del producto
  const dataProductResp = await getDataProduct()
  setProduct(dataProductResp)

  //mercado pago
  initMercadoPago(allpkmp.pk_test2, {
    locale: 'es-AR'
  })

  //Stripe
  const key = await getPublicKeyStripe()
  const stripe = await loadStripe(key)

  setStripePromise(stripe)
}

export default initPayMethod
