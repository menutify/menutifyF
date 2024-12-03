import { initMercadoPago } from '@mercadopago/sdk-react'
//credenciales de produccion de vendedor test

// https://www.mercadopago.com.ar/developers/es/docs/checkout-bricks/integration-test/go-to-production-requirements
async function initPayMethod() {
  //mercado pago
  initMercadoPago(import.meta.env.VITE_MERCADOPAGO_CREDENTIAL, {
    locale: 'es-AR'
  })
}

export default initPayMethod
