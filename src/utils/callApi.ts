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

const postDataForm = async (url, body, headers = {}) => {
  try {
    const { data } = await axiosInstance.postForm(url, body, {
      headers,
      withCredentials: true
    })

    return data
  } catch (e) {
    console.log({ errorInPostForm: e })

    return e.response.data
  }
}

const patchDataForm = async (url, body, headers = {}) => {
  try {
    const { data } = await axiosInstance.patch(url, body, {
      headers,
      withCredentials: true
    })

    return data
  } catch (e) {
    console.log({ errorInPostForm: e })

    return e.response.data
  }
}


const callAPI = {
  getData,
  postData,
  postDataForm,patchDataForm
}

export default callAPI
