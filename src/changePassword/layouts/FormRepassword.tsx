import { useNavigate } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import FormFieldComponent from '@/Components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { repasswordFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { logText, repasText } from '@/data/text'
import FormContainer from '@/Components/my/FormContainer'

const defaultValueForm = {
  email: ''
}

function FormRepassword() {
  const formOptions = useFormHook(repasswordFormScheme, defaultValueForm)

  const navigate = useNavigate()

  const { handleSubmit, error, isPending } = HandleFormSubmit()

  async function onSubmit(values: z.infer<typeof repasswordFormScheme>) {
    const resp = await handleSubmit(routesApi.sendEmail, {
      email: values.email
    })
    if (!resp) return

    localStorage.setItem('emailRe',values.email)

    navigate(routesPath.sendEmail, { replace: true })
  }

  return (
    <FormContainer
      formOptions={formOptions}
      error={error}
      isPending={isPending}
      functionSubmit={onSubmit}
      textButton={repasText.button}
    >
      <div>
        <FormFieldComponent
          className=''
          form={formOptions}
          name={'email'}
          ph={logText.ph1}
          title=''
        />
      </div>
    </FormContainer>
  )
}

export default FormRepassword
