import { useNavigate } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { caAccountFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { caAccount } from '@/data/text'

const defaultValueForm = {
  email: '',
  password: '',
  repassword: ''
}

function FormCreateAccount() {
  const navigate = useNavigate()

  const formOptions = useFormHook(caAccountFormScheme, defaultValueForm)

  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit()

  const onSubmit = async (values: z.infer<typeof caAccountFormScheme>) => {
    const { email, password, repassword } = values

    const resp = await handleSubmit(routesApi.verifyAccount, {
      email,
      password,
      repassword
    })

    if (!resp) {
      console.log('error al enviar email de verificacion')
      return
    }

    navigate(routesPath.caVerifyAccount, { replace: true })
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
              type='email'
              form={formOptions}
              name={'email'}
              ph={caAccount.ph1}
              title=''
            />
            <FormFieldComponent
              className='mb-2'
              type='password'
              form={formOptions}
              name={'password'}
              ph={caAccount.ph2}
              title=''
            />
            <FormFieldComponent
              className='mb-2'
              type='password'
              form={formOptions}
              name={'repassword'}
              ph={caAccount.ph3}
              title=''
            />
          </div>
          <Button
            className='bg-button_color_1 w-full h-9 '
            type='submit'
            disabled={isPending ? true : false}
          >
            {caAccount.button1}
          </Button>
        </form>
      </Form>
      {error.error && <p className='text-red-800'>{error.msg}</p>}
    </>
  )
}

export default FormCreateAccount
