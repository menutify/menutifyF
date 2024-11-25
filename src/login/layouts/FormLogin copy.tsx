import EmailInput from '../../components/Inputs/EmailInput'
import Password from '../../components/Inputs/PasswordInput'
import ButtonSubmit from '../../components/ButtonSubmit'
import HandleFormSubmit from '../../utils/handleForSubmit'
import { useNavigate } from 'react-router-dom'
import useHandleData from '../../hooks/useHandleData'
import { routesApi, routesPath } from '../../data/routes'
import { useDataGlobalContext } from '../../Context/GlobalContext'

const defaultValueForm = {
  email: 'gianco.marquez@gmail.com',
  password: 'elkake'
}

function FormLogin() {
  const navigate = useNavigate()
  const { setUser } = useDataGlobalContext()

  const [inputData, handleDataForm] = useHandleData(defaultValueForm)

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit()

  //?--------------funcionLog-----------------
  const handleLogin = async (e) => {
    e.preventDefault()

    const data = await handleSubmit(routesApi.login, {
      email: inputData.email,
      password: inputData.password
    })

    if (!data) return
    //probar isn verificar la respuesta
    setUser(data)

    navigate(data.isNew ? routesPath.caPayment : routesPath.home)
  }

  return (
    <form onSubmit={handleLogin}>
      {error.error && <p className='error'>{error.msg}</p>}
      <EmailInput setData={handleDataForm} data={inputData.email} />
      <Password data={inputData.password} setData={handleDataForm} />
      <ButtonSubmit isPending={isPending} />
    </form>
  )
}

export default FormLogin
