import { useNavigate } from 'react-router-dom'
import useHandleData from '../../hooks/useHandleData'
import Password from '../Inputs/PasswordInput'
import ButtonSubmit from '../ButtonSubmit'
import HandleFormSubmit from '../../helpers/handleForSubmit'
import {
  passwordLengthValidation,
  twinsPassword
} from '../../helpers/validForm'
import { useState } from 'react'

const defaultValueForm = {
  password: '',
  repassword: ''
}

// eslint-disable-next-line react/prop-types
function FormChangePassword({ token }) {
  const [modal, setModal] = useState(false)

  const navigate = useNavigate()
  // datos de los input
  const [data, handleDataForm] = useHandleData(defaultValueForm)

  // validaciones de datos
  const validations = {
    password: (e) => passwordLengthValidation(e.password),
    repassword: (e) => twinsPassword(e.repassword, e.password)
  }

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit(validations)

  //?--------------funcionLog-----------------
  const handlePassword = async (e) => {
    e.preventDefault()

    const resp = await handleSubmit(
      data,
      'auth/reset-password',
      {
        password: data.password,
        repassword: data.repassword
      },
      { authorization: token }
    )

    if (!resp) {
      console.error('Error en el inicio de sesión:')
      return
    }
    setModal(true)
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <form onSubmit={handlePassword}>
        {error.error && <p className='error'>{error.msg}</p>}
        <Password data={data.password} setData={handleDataForm} />
        <Password
          data={data.repassword}
          setData={handleDataForm}
          name='repassword'
        />
        {!modal ? <ButtonSubmit isPending={isPending} /> : <></>}
      </form>
      {modal ? (
        <div>
          <p>Contraseña cambiada correctamente</p>
          <button onClick={goToLogin}>Continuar</button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default FormChangePassword
