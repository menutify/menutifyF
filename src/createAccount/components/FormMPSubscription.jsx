import { CardPayment } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig.js'
import { useDataGlobalContext } from '../../Context/GlobalContext.jsx'
import { v4 } from 'uuid'
/**
 * probar pago:
 *   5287 3383 1025 3304
 *   11/25
 *   123
 */

function FormMPSubscription() {
  const [referenceId, setreferenceId] = useState(null)
  const [idepotency, setIdepotency] = useState('')
  const { user, product } = useDataGlobalContext()

  // useEffect(() => {
  //   axiosInstance
  //     .post('/payment/createReferenceMP')
  //     .then(({ data }) => {
  //       const id = data.data.id
  //       setreferenceId(id)
  //     })
  //     .catch(console.log)
  // }, [])

  useEffect(() => {
    if (window.cardPaymentBrickController) {
      console.log('mp initialized')
    }
    const idempotencyKey = v4()
    setIdepotency(idempotencyKey)
    return () => {
      console.log('mp unmounted')
      // Si tienes un controlador explícito para desmontar el Brick:
      if (window.cardPaymentBrickController) {
        window.cardPaymentBrickController.unmount()
      }
    }
  }, [])

  // Configuración de la personalización para habilitar solo Mercado Pago Wallet y tarjetas de débito
  const customization = {
    visual: {
      style: {
        customVariables: {
          theme: 'flat', // | 'dark' | 'bootstrap' | 'flat'
          texts: {
            formTitle: 'Tarjeta de Debito'
          }
        }
      }
    },
    paymentMethods: {
      types: {
        included: ['credit_card', 'debit_card'] // Excluye tarjetas de crédito
      },
      // minInstallments: 1,
      maxInstallments: 1
    }
  }

  // Inicialización del monto que se va a pagar
  const initialization = {
    // amount: product.price // 20000
    amount: 120 // 20000
    // payer: {
    //   email: 'correoa_pruebas1111@example.com'
    // }
  }

  // Localización en español para América Latina (Argentina)
  const locale = 'es-AR'

  // Callback cuando el Brick esté listo
  const onReady = () => {
    console.log('Mercado Pago Brick está listo')
    console.log({ referenceId })
  }

  // // Callback cuando el usuario haga submit con los datos de pago
  // const onSubmit = async (paymentData) => {
  //   console.log('Datos de pago:', paymentData)

  //   try {
  //     const { data: respuesta } = await axiosInstance.post(
  //       '/payment/payment-intent',
  //       paymentData
  //     )
  //     console.log({ respuesta })
  //   } catch (error) {}
  //   console.log({ error })

  //   // Aquí puedes enviar los datos de pago a tu servidor para procesar la transacción
  // }

  const onSubmit = async (formData) => {
    // callback llamado al hacer clic en el botón enviar datos
    console.log(formData)
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/payment/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idepotency,
          Authorization: 'Bearer TEST-a01de139-ec21-47ed-8900-1971056920a1'
        },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          console.log({ response })
          resolve()
        })
        .catch((error) => {
          console.log({ error })
          // manejar la respuesta de error al intentar crear el pago
          reject()
        })
    })
  }

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error)
  }

  return (
    <div>
      <h3>Suscripción</h3>
      <CardPayment
        initialization={initialization}
        // customization={customization}
        // locale={locale}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  )
}

export default FormMPSubscription
