import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import FormFieldComponent from '@/Components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { repasswordConfirmFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { logText, repasText } from '@/data/text'
import FormContainer from '@/Components/my/FormContainer'

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

    navigate(routesPath.confirmChangePassword, { replace: true })
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
          className=''
          type='password'
          form={formOptions}
          name={'password'}
          ph={logText.ph2}
          title={repasText.label1}
        />
        <FormFieldComponent
          className=''
          type='password'
          form={formOptions}
          name={'repassword'}
          ph={logText.ph2}
          title={repasText.label2}
        />
      </div>
    </FormContainer>
  )
}

export default FormChangePassword
