import { initMercadoPago } from '@mercadopago/sdk-react'
//credenciales de produccion de vendedor test
const allpkmp = {
  pk_test1: 'APP_USR-f9e0aab2-5def-4b4e-9feb-62d7cbbc8ca1',
  pk_test2: 'APP_USR-dd41ce7f-c794-4189-9bed-4db1f1569a9e',
  pk_test3: 'TEST-ebf14241-d565-4333-80d6-407edd2061ce'
}

// https://www.mercadopago.com.ar/developers/es/docs/checkout-bricks/integration-test/go-to-production-requirements
async function initPayMethod() {
  //mercado pago
  initMercadoPago(allpkmp.pk_test3, {
    locale: 'es-AR'
  })
}

export default initPayMethod
