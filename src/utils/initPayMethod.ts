import { initMercadoPago } from '@mercadopago/sdk-react'
const allpkmp = {
  pk_test1: 'TEST-a01de139-ec21-47ed-8900-1971056920a1', //onePay
  pk_test2: 'APP_USR-f9e0aab2-5def-4b4e-9feb-62d7cbbc8ca1', // vendedor 
  pk_test3: 'TEST-bc5aba84-1864-40ea-b90e-39e4d7bacb3a' //suscription
}

async function initPayMethod() {
    //mercado pago
  initMercadoPago(allpkmp.pk_test2, {
    locale: 'es-AR'
  })

}

export default initPayMethod
