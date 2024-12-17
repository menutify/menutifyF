import { useState } from 'react'
import callAPI from './callApi'
import { useDataGlobalContext } from '@/Context/GlobalContext'

// import validateInputData from './validateFormInputData'
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
  const { setApiPetition } = useDataGlobalContext()

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
  const handleSubmit = async (
    path: string,
    body: Record<string, any>,
    header: Record<string, string> = {}
  ): Promise<Record<string, any> | boolean> => {
    setIsPending(true)
    console.log({ path, body, header })

    setApiPetition(true)
    const {
      data,
      error: apiError,
      msg
    } = await callAPI.postData(path, body, header)
    setApiPetition(false)
    console.log({ data, error, msg })
    if (apiError) {
      setError({ error: true, msg })
      setIsPending(false)
      return false
    }

    setIsPending(false)
    //retornar datos de la APi
    return data
  }

  const handleSubmitForm = async (
    path: string,
    body: Record<string, any>,
    header: Record<string, string> = {}
  ): Promise<Record<string, any> | boolean> => {
    setIsPending(true)
    setApiPetition(true)
    const {
      data,
      error: apiError,
      msg
    } = await callAPI.postDataForm(path, body, header)
    setApiPetition(false)
    if (apiError) {
      setError({ error: true, msg })
      setIsPending(false)
      return false
    }

    setIsPending(false)
    //retornar datos de la APi
    return data
  }

  const handlePatchFormSubmit = async (
    path: string,
    body: Record<string, any>,
    header: Record<string, string> = {}
  ): Promise<Record<string, any> | boolean> => {
    setIsPending(true)
    setApiPetition(true)
    const {
      data,
      error: apiError,
      msg
    } = await callAPI.patchDataForm(path, body, header)
    setApiPetition(false)
    if (apiError) {
      setError({ error: true, msg })
      setIsPending(false)
      return false
    }

    setIsPending(false)
    //retornar datos de la APi
    return data
  }

  const handlePatchSubmit = async (
    path: string,
    body: Record<string, any>,
    header: Record<string, string> = {}
  ): Promise<Record<string, any> | boolean> => {
    setIsPending(true)
    setApiPetition(true)
    const {
      data,
      error: apiError,
      msg
    } = await callAPI.patchData(path, body, header)
    setApiPetition(false)
    if (apiError) {
      setError({ error: true, msg })
      setIsPending(false)
      return false
    }

    setIsPending(false)
    //retornar datos de la APi
    return data
  }

  const handleDelete = async (
    path: string,
    header: Record<string, string> = {}
  ): Promise<Record<string, any> | boolean> => {
    setIsPending(true)
    setApiPetition(true)
    const {
      data,
      error: apiError,
      msg
    } = await callAPI.deleteData(path, header)
    setApiPetition(false)
    if (apiError) {
      setError({ error: true, msg })
      setIsPending(false)
      return false
    }

    setIsPending(false)
    //retornar datos de la APi
    return data
  }

  return {
    handleSubmit,
    handlePatchFormSubmit,
    handleSubmitForm,
    error,
    isPending,
    handlePatchSubmit,
    handleDelete
  }
}

export default HandleFormSubmit
