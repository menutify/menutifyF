import callAPI from './callApi'
export const apiUrl = {
  publicKeyStripe: '/create-account/config',
  productData: '/payment/productData'
}

export const getPublicKeyStripe = async () => {
  const data = await callAPI.getData(apiUrl.publicKeyStripe)
  if (data.error === true) return console.log(data.msg)
  return data.publicKey
}

export const getDataProduct = async () => {
  const data = await callAPI.getData(apiUrl.productData)
  if (data.error === true) return console.log(data.msg)
  /*
  data: {
        title: 'menutifySub',
        price: 20000,
        description: 'menutify suscripcion',
        quantity: 1
      }
  */
  return data.data
}
