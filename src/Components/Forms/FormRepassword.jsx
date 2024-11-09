import { useNavigate } from 'react-router-dom'
import EmailInput from '../Inputs/EmailInput'
import useHandleData from '../../hooks/useHandleData'
import { emailValidation } from '../../utils/validForm'

import ButtonSubmit from '../ButtonSubmit'
import HandleFormSubmit from '../../utils/handleForSubmit'

const defaultValueForm = {
  email: 'gianco.marquez@gmail.com'
}

function FormRepassword() {
  const navigate = useNavigate()
  // datos de los input
  const [data, handleDataForm] = useHandleData(defaultValueForm)

  // validaciones de datos
  const validations = {
    email: (e) => emailValidation(e.email)
  }

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit(validations)

  const callFunction = async (e) => {
    e.preventDefault()

    const resp = await handleSubmit(data, 'auth/sendemail', {
      email: data.email
    })

    if (!resp) {
      return
    }

    navigate('/send-email')
  }

  return (
    <form onSubmit={callFunction}>
      {error.error && <p className='error'>{error.msg}</p>}
      <EmailInput data={data.email} setData={handleDataForm} />
      <ButtonSubmit isPending={isPending} />
    </form>
  )
}

export default FormRepassword
