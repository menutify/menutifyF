import HandleFormSubmit from '@/utils/handleForSubmit'
import { useNavigate } from 'react-router-dom'
import useFormHook from '@/hooks/useFormHook'
import { caPaymentFormScheme } from '@/utils/formScheme'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/Forms/FormFieldComponent'
import { z } from 'zod'
import { caPayment } from '@/data/text'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import phoneCodes from '@/data/phoneCodes'
import {
  CardNumber,
  ExpirationDate,
  SecurityCode
} from '@mercadopago/sdk-react'
import InputTel from '@/components/my/InputTel'
import Parr from '@/components/my/Parr'
import Separator from '@/components/my/Separator'
import mpLogo from '@/assets/createAccount/mp.svg'
import cardLogo from '@/assets/createAccount/card.svg'
import { Input } from '@/components/ui/input'
import FormFieldComponentPayment from '@/components/Forms/FormFieldComponentPayment'
import FormMercadoPago from './FormMercadoPago'
import FormMPSubscription from '../components/FormMPSubscription'
const defaultValueForm = {
  name: '',
  // code: '',
  phone: '',
  dni: '',
  cardName: ''
  // emoji: ''
}

function FormPayment() {
  // const [modal, setModal] = useState(false)
  const formOptions = useFormHook(caPaymentFormScheme, defaultValueForm)
  const navigate = useNavigate()

  const { handleSubmit, error, isPending } = HandleFormSubmit()

  const onSubmit = async (values: z.infer<typeof caPaymentFormScheme>) => {
    console.log(values)
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
              type='text'
              form={formOptions}
              name={'name'}
              ph={caPayment.ph1}
              title={''}
            />
            <div className='flex gap-2 h-9 justify-center items-center'>
              <Label className='h-full w-11 bg-black rounded-md mb-2 border-solid border border-border_input_color flex justify-center items-center'>
                <img className='h-3/5 rounded-sm ' src={phoneCodes[1].emoji} />
              </Label>
              <InputTel
                className='mb-2 flex-1'
                form={formOptions}
                name={'phone'}
              />
            </div>
            <Separator text={caPayment.other} />
            <div className='flex justify-center items-center gap-2 h-16 w-full bg-gray-500'>
              <div className='flex-1 h-full w-full bg-black rounded-md '>
                <span>{caPayment.option1}</span>
                <img className='h-2/3' src={cardLogo} alt='' />
              </div>
              <div className='flex-1 h-full w-full bg-black rounded-md flex justify-center items-center '>
                <img className='h-full' src={mpLogo} alt='' />
              </div>
            </div>
            <div className='flex gap-2 flex-col mt-2 mb-2'>
              <FormFieldComponentPayment
                className='font-light placeholder:text-ph_color_1'
                type='text'
                form={formOptions}
                name={'dni'}
                ph={'DNI'}
                title={''}
              />
              <FormFieldComponentPayment
                className='font-light placeholder:text-ph_color_1'
                type='text'
                form={formOptions}
                name={'cardName'}
                ph={'Nombre de la Tarjeta'}
                title={''}
              />
              <div className='flex gap-2'>
                <CardNumber placeholder='1234 5678 1234 4321' />
                <SecurityCode placeholder='123' />
                <ExpirationDate placeholder='01/26' mode='short' />
              </div>
            </div>
          </div>
          <Button
            className='bg-primary_color w-full h-9 '
            type='submit'
            disabled={isPending ? true : false}
          >
            {caPayment.button}
          </Button>
        </form>
      </Form>
      {error.error && <p className='error'>{error.msg}</p>}

      {/* <div className='radio-group'>
        
          

        <TextInput
          name={'name'}
          data={data.name}
          setData={handleDataForm}
          placeholder='Name and Last name'
          pattern='[A-Za-z\s]+'
        />
        <div className='form-pay-number'>
          <div>
            <img src={data.emoji} alt='' />
          </div>
          <select
            className='select'
            name='code'
            onChange={handleDataForm}
            defaultValue='code'
          >
            <option value='code' disabled>
              +00
            </option>
            {phoneCodes.map((info, i) => (
              <Options
                key={info.code + i}
                id={info.code}
                value={info.dial_code}
                text={`${info.dial_code}`}
                emoji={info.emoji}
              />
            ))}
          </select>
          <NumberInput
            name='phone'
            data={data.phone}
            setData={handleDataForm}
          />
        </div>
        <div>
          
            <FormMPSubscription />
          
        </div>
        {error && <div>{error}</div>}
      </div> */}
    </>
  )
}

export default FormPayment
