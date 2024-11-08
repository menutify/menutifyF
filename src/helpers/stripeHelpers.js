import axiosInstance from './axiosConfig'

export const obtainCustomerId = async () => {
  try {
    const { data } = await axiosInstance.post('/pay/create-customer')
    console.log('id del cliente obtenido')
    return data.customer
  } catch (error) {
    console.log('Error al obtener clienteid', { error })
    return
  }
}
