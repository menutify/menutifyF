import {
  CardNumber,
  SecurityCode,
  ExpirationDate,
  createCardToken
} from '@mercadopago/sdk-react'

function FormMPSubscription() {
  const onSubmit = async (e) => {
    e.preventDefault()

    const response = await createCardToken({
      cardholderName: 'APRO',
      identificationType: 'DNI',
      identificationNumber: '12345678'
    })
    console.log('Card Token Response = ', { response })

    // try {
    //   const resp = await fetch('http://localhost:3000/api/payment/sub-intent', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization:
    //         'Bearer TEST-6089233700666068-112016-02806d34a179c855b37cb1f0793d581b-1570773738'
    //     },
    //     body: JSON.stringify({
    //       tokenid: response.id
    //     })
    //   })

    //   console.log({ resp })
    // } catch (error) {
    //   console.log({ error })
    // }
  }

  return (
    <form onSubmit={onSubmit}>
      <CardNumber placeholder='Card Number' />
      <SecurityCode placeholder='Security Code' />
      <ExpirationDate placeholder='Expiration Date' mode='short' />
      <button>Pay</button>
    </form>
  )
}

export default FormMPSubscription
