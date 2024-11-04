import { useState } from 'react'
import callAPI from './callApi'

const HandleFormSubmit = (validations) => {
  const [error, setError] = useState({ error: false, msg: '' })
  const [isPending, setIsPending] = useState(false)

  // valicion + submitData
  const handleSubmit = async (data, path, body, header = {}) => {
    setIsPending(true)
    setError({ error: false, msg: '' })

    // verificar validaciones
    for (const validation of Object.values(validations)) {
      const errorMessage = validation(data)
      if (errorMessage) {
        setError({ error: true, msg: errorMessage })
        setIsPending(false)
        return null
      }
    }

    // call Api
    const resp = await callAPI.postData(path, body, header)

    if (resp.error) {
      setError({ error: true, msg: resp.data?.msg })
      setIsPending(false)
      return null
    }

    setIsPending(false)
    //retornar datos de la APi
    return resp
  }

  return { handleSubmit, error, isPending }
}

export default HandleFormSubmit
