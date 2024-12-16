import { z } from 'zod'
import FormFieldComponent from '@/Components/Forms/FormFieldComponent'

import { loginFormScheme } from '@/utils/formScheme'
import useFormHook from '@/hooks/useFormHook'
import { useNavigate } from 'react-router-dom'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi, routesPath } from '@/data/routes'
import { logText } from '@/data/text'
import FormContainer from '@/Components/my/FormContainer'
import { User } from '@/types'

const defaultValueForm = {
  email: '',
  password: ''
}
function FormLogin() {
  const formOptions = useFormHook(loginFormScheme, defaultValueForm)

  const navigate = useNavigate()
  const { setUser } = useDataGlobalContext()

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit()

  async function onSubmit(values: z.infer<typeof loginFormScheme>) {
    // const { email, password } = values
    console.log('entramos')
    const data = await handleSubmit(routesApi.login, values)

    if (!data) return

    setUser(data as User)

    const { isNew, subActive } = data as User

    navigate(
      isNew
        ? subActive
          ? routesPath.completePayment
          : routesPath.caPayment
        : routesPath.dashboard,
      {
        replace: true
      }
    )
  }
  return (
    <FormContainer
      formOptions={formOptions}
      error={error}
      isPending={isPending}
      functionSubmit={onSubmit}
      textButton={logText.button}
    >
      <div>
        <FormFieldComponent
          form={formOptions}
          name={'email'}
          ph={logText.ph1}
          title=''
        />
        <FormFieldComponent
          type='password'
          form={formOptions}
          name={'password'}
          ph={logText.ph2}
          title=''
        />
      </div>
    </FormContainer>
  )
}

export default FormLogin
