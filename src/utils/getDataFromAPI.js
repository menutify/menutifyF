import axiosInstance from './axiosConfig'
export const apiUrl = {
  publicKeyStripe: '/pay/config'
}
export const getPublicKeyStripe = async () => {
  const { data } = await axiosInstance.get(apiUrl.publicKeyStripe)
  return data.publishableKey
}
