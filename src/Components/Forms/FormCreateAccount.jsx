import useHandleData from '../../hooks/useHandleData'
import EmailInput from '../Inputs/EmailInput'
import Password from '../Inputs/PasswordInput'
import ButtonSubmit from '../ButtonSubmit'
import { useNavigate } from 'react-router-dom'
import {
  emailValidation,
  passwordLengthValidation,
  twinsPassword
} from '../../helpers/validForm'
import HandleFormSubmit from '../../helpers/handleForSubmit'
import TextInput from '../Inputs/TextInput'

const defaultData = {
  name: '',
  email: '',
  password: '',
  repassword: ''
}

function FormCreateAccount() {
  const navigate = useNavigate()

  const [data, handleDataForm] = useHandleData(defaultData)

  // validaciones de datos
  const validations = {
    email: (e) => emailValidation(e.email),
    password: (e) => passwordLengthValidation(e.password),
    repassword: (e) => twinsPassword(e.password, e.repassword)
  }

  const { handleSubmit, error, isPending } = HandleFormSubmit(validations)

  const handleNewUser = async (e) => {
    e.preventDefault()

    console.log({ data })
    const resp = await handleSubmit(data, 'user', {
      name: data.name,
      email: data.email,
      password: data.repassword
    })

    if (!resp) {
      console.log('error al enviar email de verificacion')
      return
    }

    navigate('/create-account/verify-account')
  }
  return (
    <>
      {error.error && <p className='error'>{error.msg}</p>}

      <form className='formRegister' onSubmit={handleNewUser}>
        <label htmlFor='email'>Name:</label>
        <TextInput
          data={data.name}
          setData={handleDataForm}
          pattern='[A-Za-z\s]+'
        />

        <label htmlFor='email'>Email:</label>
        <EmailInput data={data.email} setData={handleDataForm} />

        <label htmlFor='password'>Contraseña:</label>
        <Password data={data.password} setData={handleDataForm} />

        <label htmlFor='repassword'>Confirmar Contraseña:</label>
        <Password
          data={data.repassword}
          setData={handleDataForm}
          name='repassword'
        />

        <ButtonSubmit text='Continuar ->' isPending={isPending} />
      </form>
    </>
  )
}

export default FormCreateAccount
