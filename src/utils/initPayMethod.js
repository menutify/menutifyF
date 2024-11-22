import { initMercadoPago } from '@mercadopago/sdk-react'
import { getDataProduct, getPublicKeyStripe } from './getDataFromAPI'
import { loadStripe } from '@stripe/stripe-js'

const allpkmp = {
  pk_test1: 'TEST-a01de139-ec21-47ed-8900-1971056920a1',
  pk_test2: 'APP_USR-515b7616-d7dd-4a09-b3e6-6cc5127f46c7'
}

async function initPayMethod(setStripePromise, setProduct) {
  //obtener datos del producto
  const dataProductResp = await getDataProduct()
  setProduct(dataProductResp)

  //mercado pago
  initMercadoPago(allpkmp.pk_test1, {
    locale: 'es-AR'
  })

  //Stripe
  const key = await getPublicKeyStripe()
  const stripe = await loadStripe(key)

  setStripePromise(stripe)
}

export default initPayMethod
