import useHandleData from '../../hooks/useHandleData'
import EmailInput from '../../Components/Inputs/EmailInput'
import Password from '../../Components/Inputs/PasswordInput'
import ButtonSubmit from '../../Components/ButtonSubmit'
import { useNavigate } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'
import { routesApi, routesPath } from '../../data/routesPath'

const defaultData = {
  email: 'gianco.marquez@gmail.com',
  password: 'elkake',
  repassword: 'elkake'
}

function FormCreateAccount() {
  const navigate = useNavigate()

  const [data, handleDataForm] = useHandleData(defaultData)

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit()

  const handleNewUser = async (e) => {
    e.preventDefault()

    console.log({ data })
    const resp = await handleSubmit(routesApi.createAccount, {
      email: data.email,
      password: data.repassword
    })

    
    if (!resp) {
      console.log('error al enviar email de verificacion')
      return
    }

    navigate(routesPath.caVerifyAccount)
  }
  return (
    <>
      {error.error && <p className='error'>{error.msg}</p>}

      <form className='formRegister' onSubmit={handleNewUser}>
        <label htmlFor='email'>Name:</label>

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
