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
import Parr1 from '@/Components/my/Parr1'
import { Checkbox } from '@/Components/ui/checkbox'
import Label1 from '@/Components/my/Label1'
import Anchor1 from '@/Components/my/Anchor1'

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
      className='my-[20px]'
    >
      <div className='flex flex-col gap-[10px]'>
        <FormFieldComponent
          form={formOptions}
          name={'email'}
          ph={logText.ph1}
          title='Correo electrónico'
        />
        <FormFieldComponent
          type='password'
          form={formOptions}
          name={'password'}
          ph={logText.ph2}
          title='Contraseña'
        />
      </div>
      <div className='flex justify-between items-center mb-[15px] mt-[5px]'>
        <Parr1 className='flex justify-between items-center gap-2'>
          <Checkbox
            id='terms'
            className='w-5 h-5 flex-complete p-0 border-border_input_color bg-bg_input'
          />{' '}
          <Label1>Recordarme</Label1>
        </Parr1>
        <Anchor1 className='text-primary_color' to={routesPath.repassword}>
          {logText.repass}
        </Anchor1>
      </div>
    </FormContainer>
  )
}

export default FormLogin
