import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/Forms/FormFieldComponent'

import { loginFormScheme } from '@/utils/formScheme'
import useFormHook from '@/hooks/useFormHook'
import { useNavigate } from 'react-router-dom'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi, routesPath } from '@/data/routes'
import { logText } from '@/data/text'

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

    setUser(data)

    navigate(data.isNew ? routesPath.caPayment : routesPath.home, {
      replace: true
    })
  }
  return (
    <>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='space-y-2'
        >
          <div>
            <FormFieldComponent
            className='mb-2'
              form={formOptions}
              name={'email'}
              ph={logText.ph1}
              title=''
            />
            <FormFieldComponent
            className='mb-2'
              type='password'
              form={formOptions}
              name={'password'}
              ph={logText.ph2}
              title=''
            />
          </div>
          <Button
            className='bg-button_color_1 w-full h-9 '
            type='submit'
            disabled={isPending ? true : false}
          >
            {logText.button}
          </Button>
        </form>
      </Form>
      {error.error && <p className='error'>{error.msg}</p>}
    </>
  )
}

export default FormLogin
