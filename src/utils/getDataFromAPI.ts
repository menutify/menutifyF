import callAPI from './callApi'
export const apiUrl = {
  productData: '/payment/productData'
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
