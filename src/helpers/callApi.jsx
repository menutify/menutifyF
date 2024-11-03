import axios from 'axios'

const urlAPI = 'http://localhost:3000/api/'

const getData = async (url, headers) => {
  try {
    const response = await axios.get(urlAPI + url, {
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
    const response = await axios.post(urlAPI + url, body, {
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
