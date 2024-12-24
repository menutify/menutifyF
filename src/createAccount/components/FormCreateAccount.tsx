import { useNavigate } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'

import { z } from 'zod'
import FormFieldComponent from '@/Components/Forms/FormFieldComponent'
import useFormHook from '@/hooks/useFormHook'
import { caAccountFormScheme } from '@/utils/formScheme'
import { routesApi, routesPath } from '@/data/routes'
import { caAccount, caPayment } from '@/data/text'
import FormContainer from '@/Components/my/FormContainer'
import { Label } from '@radix-ui/react-label'
import InputTel from '@/Components/my/InputTel'
import phoneCodes from '@/data/phoneCodes'
import FormFieldCheckbox from '@/Components/my/FormFieldCheckbox'
import Label1 from '@/Components/my/Label1'

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
      error={error}
      isPending={isPending}
      functionSubmit={onSubmit}
      textButton={caAccount.button1}
    >
      <div className='flex flex-col gap-[10px]'>
        <FormFieldComponent
          className=''
          type='text'
          form={formOptions}
          name={'name'}
          ph={caPayment.ph1}
          title={'Ingresá tu nombre completo'}
        />
        <div className='flex gap-[13px]'>
          <div className='flex flex-col'>
          <Label1 className=''>Télefono</Label1>
          <div className='flex gap-[13px] h-full justify-center '>
          <Label className='h-10 w-12 bg-bg_input rounded-md mt-2 border-solid border border-border_input_color flex justify-center items-center'>
              <img className='h-2/5 rounded-sm ' src={phoneCodes[1].emoji} />
            </Label>
            <InputTel
              className=' flex-1 flex flex-col h-full text-sm/6 '
              form={formOptions}
              name={'phone'}
            />
          </div>
          </div>
          <FormFieldComponent
            className=''
            type='email'
            form={formOptions}
            name={'email'}
            ph={caAccount.ph1}
            title='Email'
          />
        </div>
        <FormFieldComponent
          className=''
          type='password'
          form={formOptions}
          name={'password'}
          ph={caAccount.ph2}
          title='Contraseña'
        />
        <FormFieldComponent
          className=''
          type='password'
          form={formOptions}
          name={'repassword'}
          ph={caAccount.ph3}
          title='Confirmá tu contraseña'
        />
        <FormFieldCheckbox form={formOptions} name={'check'} />
      </div>
    </FormContainer>
  )
}

export default FormCreateAccount
