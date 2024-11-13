import { useState } from 'react'
import callAPI from './callApi'
import validateInputData from './validateFormInputData'
/**
 * HandleFormSubmit se encarga de validar y obtener los errores
 * @returns
 *  - handleSubmit funcion para llamar a la api
 *  - error : objet {error:bool,msg:string}
 *  - isPending : bool
 */
const HandleFormSubmit = () => {
  const [error, setError] = useState({ error: false, msg: '' })
  const [isPending, setIsPending] = useState(false)

  // valicion + submitData
  /**
   *
   * @param {string} path
   * @param {object} body
   * @param {object} header
   * @returns
   * - si error= true , return null
   * - si error= false , return data de la api
   */
  const handleSubmit = async (path, body, header = {}) => {
    setIsPending(true)

    const validation = validateInputData(body)

    if (validation) {
      setError({ error: true, msg: validation })
      setIsPending(false)
      return
    }

    const { data, error, msg } = await callAPI.postData(path, body, header)

    if (error) {
      setError({ error: true, msg })
      setIsPending(false)
      return
    }

    setIsPending(false)
    //retornar datos de la APi
    return data
  }

  return { handleSubmit, error, isPending }
}

export default HandleFormSubmit
