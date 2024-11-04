import callAPI from '../../helpers/callApi'
import EmailInput from '../Inputs/EmailInput'
import Password from '../Inputs/PasswordInput'
import {
  emailValidation,
  passwordLengthValidation
} from '../../helpers/validForm'
import ButtonSubmit from '../ButtonSubmit'
import HandleFormSubmit from '../../helpers/handleForSubmit'
import { useNavigate } from 'react-router-dom'
import useHandleData from '../../hooks/useHandleData'

const defaultValueForm = {
  email: 'gianco.marquez@gmail.com',
  password: 'elkake'
}

function FormLogin() {
  const navigate = useNavigate()
  // datos de los input
  const [data, handleDataForm] = useHandleData(defaultValueForm)

  // validaciones de datos
  const validations = {
    email: (e) => emailValidation(e.email),
    password: (e) => passwordLengthValidation(e.password)
  }

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit(validations)

  //?--------------funcionLog-----------------
  const handleLogin = async (e) => {
    e.preventDefault()

    const resp = await handleSubmit(data, 'login', {
      email: data.email,
      password: data.password
    })

    if (!resp) {
      console.error('Error en el inicio de sesión:')
      return
    }

    localStorage.setItem('token', resp.data.token)

    navigate(resp.data.new ? '/payment' : '/me')
  }

  return (
    <form onSubmit={handleLogin}>
      {error.error && <p className='error'>{error.msg}</p>}
      <EmailInput setData={handleDataForm} data={data.email} />
      <Password data={data.password} setData={handleDataForm} />
      <ButtonSubmit isPending={isPending} />
    </form>
  )
}

export default FormLogin
