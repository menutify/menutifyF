import { useNavigate } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { repasswordFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { logText, repasText } from '@/data/text'

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

    navigate(routesPath.sendEmail, { replace: true })
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
          </div>
          <Button
            className='bg-button_color_1 w-full h-9 '
            type='submit'
            disabled={isPending ? true : false}
          >
            {repasText.button}
          </Button>
        </form>
      </Form>
      {error.error && <p className='error'>{error.msg}</p>}
    </>
  )
}

export default FormRepassword
