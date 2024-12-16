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
    if (typeof e === 'object' && e !== null && 'response' in e) {
      const error = e as { response: { data: { error: boolean; msg: string } } };
      return error.response.data; // Ahora TypeScript sabe qué tipo tiene
    }
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

    if (typeof e === 'object' && e !== null && 'response' in e) {
      const error = e as { response: { data: { error: boolean; msg: string } } };
      return error.response.data; // Ahora TypeScript sabe qué tipo tiene
    }
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

    if (typeof e === 'object' && e !== null && 'response' in e) {
      const error = e as { response: { data: { error: boolean; msg: string } } };
      return error.response.data; // Ahora TypeScript sabe qué tipo tiene
    }
  }
}

const patchDataForm = async (url, body, headers = {}) => {
  try {
    const { data } = await axiosInstance.patchForm(url, body, {
      headers,
      withCredentials: true
    })

    return data
  } catch (e) {
    console.log({ errorInPostForm: e })

    if (typeof e === 'object' && e !== null && 'response' in e) {
      const error = e as { response: { data: { error: boolean; msg: string } } };
      return error.response.data; // Ahora TypeScript sabe qué tipo tiene
    }
  }
}

const patchData = async (url, body, headers = {}) => {
  try {
    const { data } = await axiosInstance.patch(url, body, {
      headers,
      withCredentials: true
    })

    return data
  } catch (e) {
    console.log({ errorInPostForm: e })

    if (typeof e === 'object' && e !== null && 'response' in e) {
      const error = e as { response: { data: { error: boolean; msg: string } } };
      return error.response.data; // Ahora TypeScript sabe qué tipo tiene
    }
  }
}

const deleteData = async (url, headers = {}) => {
  try {
    const { data } = await axiosInstance.delete(url, {
      headers,
      withCredentials: true
    })

    return data
  } catch (e) {
    console.log({ errorInPostForm: e })

    if (typeof e === 'object' && e !== null && 'response' in e) {
      const error = e as { response: { data: { error: boolean; msg: string } } };
      return error.response.data; // Ahora TypeScript sabe qué tipo tiene
    }
  }
}

const callAPI = {
  getData,
  postData,
  postDataForm,
  patchDataForm,
  patchData,deleteData
}

export default callAPI
