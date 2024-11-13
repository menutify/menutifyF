import callAPI from './callApi'
export const apiUrl = {
  publicKeyStripe: '/create-account/config'
}

export const getPublicKeyStripe = async () => {
  const data = await callAPI.getData(apiUrl.publicKeyStripe)
  if (data.error === true) return console.log(data.msg)
  return data.publicKey
}
