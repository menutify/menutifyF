import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { repasswordConfirmFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { logText, repasText } from '@/data/text'

const defaultValueForm = {
  password: '',
  repassword: ''
}

function FormChangePassword() {
  // const [modal, setModal] = useState(false)
  const formOptions = useFormHook(repasswordConfirmFormScheme, defaultValueForm)
  const navigate = useNavigate()
  const param = useParams()
  //manejador del submit
  const { handleSubmit, error, isPending } = HandleFormSubmit()

  //?--------------funcionLog-----------------
  const onSubmit = async (
    values: z.infer<typeof repasswordConfirmFormScheme>
  ) => {
    console.log(param)

    const resp = await handleSubmit(
      routesApi.repassword,
      {
        password: values.password,
        repassword: values.repassword
      },
      { authorization: param.token as string }
    )

    if (!resp) return

    navigate(routesPath.confirmChangePassword,{replace:true})
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
              type='password'
              form={formOptions}
              name={'password'}
              ph={logText.ph2}
              title={repasText.label1}
            />
            <FormFieldComponent
              className='mb-2'
              type='password'
              form={formOptions}
              name={'repassword'}
              ph={logText.ph2}
              title={repasText.label2}
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

export default FormChangePassword
