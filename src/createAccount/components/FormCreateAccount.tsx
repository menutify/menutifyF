import { useNavigate } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import FormFieldComponent from '@/components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { caAccountFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { caAccount, caPayment } from '@/data/text'
import FormContainer from '@/components/my/FormContainer'
import { Label } from '@radix-ui/react-label'
import InputTel from '@/Components/my/InputTel'
import phoneCodes from '@/data/phoneCodes'
import FormFieldCheckbox from '@/Components/my/FormFieldCheckbox'

const defaultValueForm = {
  name: '',
  check: false,
  phone: '',
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
    const { email, password, repassword, phone: oldPhone, name } = values

    const phone = oldPhone.replace(' ', '').replace('-', '')

    const resp = await handleSubmit(routesApi.verifyAccount, {
      country: 'Argentina',
      name,
      phone,
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
      error={error && true}
      isPending={isPending}
      functionSubmit={onSubmit}
      textButton={caAccount.button1}
    >
      <div>
        <FormFieldComponent
          className=''
          type='text'
          form={formOptions}
          name={'name'}
          ph={caPayment.ph1}
          title={''}
        />
        <div className='flex gap-2 h-auto justify-center  '>
          <Label className='h-9 w-11 bg-black rounded-md  border-solid border border-border_input_color flex justify-center items-center'>
            <img className='h-3/5 rounded-sm ' src={phoneCodes[1].emoji} />
          </Label>
          <InputTel
            className=' flex-1 flex flex-col'
            form={formOptions}
            name={'phone'}
          />
        </div>
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
        <FormFieldCheckbox form={formOptions} name={'check'} />
      </div>
      
    </FormContainer>
  )
}

export default FormCreateAccount
