import axios from 'axios'
import axiosInstance from './axiosConfig'



const getData = async (url, headers) => {
  try {
    const response = await axios.get(url, {
      headers
    })

    const { data } = response
    return data
  } catch (e) {
    return {
      error: true,

      data: {
        msg: e.response?.data?.msg || 'Error desconocido',
        status: e.response?.status || 500
      }
    }
  }
}

const postData = async (url, body, headers = {}) => {
  try {
    const response = await axiosInstance.post(url, body, {
      headers
    })

    return response
  } catch (e) {
    return {
      error: true,
      data: {
        msg: e.response?.data?.msg || 'Error desconocido',
        status: e.response?.status || 500
      }
    }
  }
}

const callAPI = {
  getData,
  postData
}

export default callAPI
