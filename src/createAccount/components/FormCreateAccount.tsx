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
import FormContainer from '@/components/my/FormContainer'

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
    <FormContainer
      formOptions={formOptions}
      error={error}
      isPending={isPending}
      functionSubmit={onSubmit}
      textButton={caAccount.button1}
    >
      <div>
        <FormFieldComponent
          className=''
          type='email'
          form={formOptions}
          name={'email'}
          ph={caAccount.ph1}
          title=''
        />
        <FormFieldComponent
          className=''
          type='password'
          form={formOptions}
          name={'password'}
          ph={caAccount.ph2}
          title=''
        />
        <FormFieldComponent
          className=''
          type='password'
          form={formOptions}
          name={'repassword'}
          ph={caAccount.ph3}
          title=''
        />
      </div>
    </FormContainer>
  )
}

export default FormCreateAccount
