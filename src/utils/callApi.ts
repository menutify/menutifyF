import axiosInstance from './axiosConfig'

const getData = async (url, headers = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      headers,
      withCredentials: true
    })

    const { data } = response

    return data
  } catch (e) {
    // console.log({ errorInGet: e })
    return e.response.data
  }
}

const postData = async (url, body, headers = {}) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers,
      withCredentials: true
    })

    return data
  } catch (e) {
    // console.log({ errorInGet: e })

    return e.response.data
  }
}

const callAPI = {
  getData,
  postData
}

export default callAPI
